import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Blog } from 'src/typeorm/entities/blog.entity';

import { Topic } from 'src/typeorm/entities/topic.entity';
import { UserCredential } from 'src/typeorm/entities/user_credentials.entity';
import { UserRole } from 'src/typeorm/entities/user_roles.entity';
import { UserTopic } from 'src/typeorm/entities/user_topic.entity';
import { User } from 'src/typeorm/entities/users.entity';

export const dbConfig: TypeOrmModuleAsyncOptions = {
    useFactory: () => ({
        type: process.env.DB_TYPE as 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Topic, UserCredential, User, UserRole, UserTopic, Blog],
        synchronize: true,
    }),
};


