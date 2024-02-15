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

    async createUser(userDetails: createUserParams, userPasswordDetails: createUserPasswordParams) {
        try {
            const assignRole: createRoleDto = {
                userId: userDetails.id
            }

            const createNewUserPasswordResponse = await
                this.userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(UserCredential)
                    .values(userPasswordDetails)
                    .execute()


            const createUserRoleResponse = await
                this.userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(UserRole)
                    .values(assignRole)
                    .execute()

            const createNewUserResponse = await
                this.userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values(userDetails)
                    .execute()



            return createNewUserResponse;

        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Some Error Occured", error.message)
        }
    }
}
