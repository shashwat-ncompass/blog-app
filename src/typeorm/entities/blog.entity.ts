import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn  } from 'typeorm';
import { User } from './users.entity';


@Entity()
export class Blog {
    @PrimaryColumn({ name: 'ID', length: 200 })
    id: string

    @Column({ name: 'NAME', length: 200 })
    name: string;

    @Column({ name: 'DESCRIPTION' })
    description: string;

    @OneToOne(() => User)
    @JoinColumn()
    ownerId: User

    @Column({ name: 'HEADER' })
    header: string;

    @Column({ name: 'FOOTER' })
    footer: string;

    @Column({ name: 'BODY' })
    body: string;

    @Column({name: 'IS_ARCHIVE', default: false})
    isArchive: boolean

    @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp' })
    updatedAt: Date;  
}