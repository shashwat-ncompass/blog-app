import { HttpStatus, Injectable } from '@nestjs/common';
import { createUserParams } from './types/createUserParams';
import { createUserPasswordParams } from './types/createUserPasswordParams';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { Repository } from 'typeorm';
import { Md5 } from 'ts-md5';
import { UserCredential, UserCredentialData } from 'src/typeorm/entities/user_credentials.entity';
import { customError } from 'src/utils/exceptionHandler';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { createRoleDto } from './dtos/createRole.dto';

@Injectable()
export class AuthService {

    @InjectRepository(User) private userRepository: Repository<User>
    @InjectRepository(UserCredential) private userCredentialRepository: Repository<UserCredential>
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>
    
    async createUser(userDetails: createUserParams, userPasswordDetails: createUserPasswordParams) {
        try {
            const userRole = this.userRoleRepository.create({ userId: userDetails.id });
            const userCredential = this.userCredentialRepository.create({ ...userPasswordDetails });

            const createNewUserPasswordResponse = await
                this.userCredentialRepository
                    .save(userCredential)
                    .then((credential) => {
                        return credential
                    });

            const createUserRoleResponse = await
                this.userRoleRepository
                    .save(userRole)
                    .then((role) => {
                        return role;
                    });

            const createNewUserResponse = await
                this.userRepository
                    .save({
                        ...userDetails,
                        role_details: createUserRoleResponse,
                        password_details: createNewUserPasswordResponse
                    })
                    .then((user) => {
                        return user;
                    });

            return createNewUserResponse

        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Some Error Occured", error.message)
        }
    }

}
