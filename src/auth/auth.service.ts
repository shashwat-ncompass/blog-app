import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { createUserParams } from './types/createUserParams';
import { createUserPasswordParams } from './types/createUserPasswordParams';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { Repository } from 'typeorm';
import { Md5 } from 'ts-md5';
import { JwtService } from '@nestjs/jwt';
import { UserCredential } from 'src/typeorm/entities/user_credentials.entity';
import { customError } from 'src/utils/exceptionHandler';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { createRoleDto } from './dtos/createRole.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { };
    @InjectRepository(User) private userRepository: Repository<User>
    @InjectRepository(UserCredential) private userCredentialRepository: Repository<UserCredential>
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>


    async createUser(userDetails: createUserParams, userPasswordDetails: createUserPasswordParams) {
        try {
            const assignRole: createRoleDto = {
                userId: userDetails.id
            }
            
            const userRole = this.userRoleRepository.create(assignRole);
            const userCredential = this.userCredentialRepository.create(userPasswordDetails);
            const user = this.userRepository.create(userDetails);

            user.role_details = userRole;
            user.password_details = userCredential;

            const createNewUserResponse = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(user)
                .execute();

            return createNewUserResponse;

        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Some Error Occured", error.message)
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

        const passwordHash = Md5.hashStr(password);
        const userCredential = this.userCredentialRepository.findOne({ where: { id: (await user).id } });

        if (!userCredential || passwordHash != (await userCredential).password)
            throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);

        return user

    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.validateUser(email, password);
        console.log(user)
        const payload = { email: (user).email, id: (user).id };
        const token = await this.jwtService.signAsync(payload);
        return token;
    }
}
