import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users.entity';
import { customError } from 'src/utils/exceptionHandler';
import { Repository } from 'typeorm';



function filterUserRoles(userObj: any): string[] {
    const roleKeys = [
        "UserRole_VIEWER",
        "UserRole_EDITOR",
        "UserRole_ADMIN",
        "UserRole_SUPER_ADMIN",
    ];
    const includedRoles: string[] = [];
    roleKeys.forEach((roleKey) => {
        if (userObj[0][roleKey] === 1) {
            includedRoles.push(roleKey.split('_')[1]);
        }
    });
    return includedRoles;
}

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUserById(id: string) {
        try {
            const userProfileResponse = await
                this.userRepository
                    .createQueryBuilder('u')
                    .leftJoinAndSelect("u.role_details", 'UserRole')
                    .leftJoinAndSelect("u.password_details", 'UserCredential')
                    .where(`u.ID = :ID`, { ID: id })
                    .execute();
            const roleArray = filterUserRoles(userProfileResponse)
            return { roleArray, userProfileResponse };
        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, "Some Error Occured", error.message)
        }
    }
}
