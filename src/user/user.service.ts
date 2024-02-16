import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { customError } from 'src/utils/exceptionHandler';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUserById(id: string) {
        try {
            const response = await
                this.userRepository
                    .createQueryBuilder('u')
                    .leftJoinAndSelect("u.role_details", 'UserRole')
                    .leftJoinAndSelect("u.password_details", 'UserCredential')
                    .where(`u.ID = :ID`, { ID: id })
                    .execute();
            return response;
        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Some Error Occured", error.message)
        }
    }
}
