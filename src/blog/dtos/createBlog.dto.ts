import { User } from "src/typeorm/entities/users.entity";

export class createBlog {
    id?: string;
    name: string;
    desc: string;
    owner?: User;
    header: string;
    footer: string;
    body: string;
    createdAt?: Date;
    updatedAt?: Date;
}