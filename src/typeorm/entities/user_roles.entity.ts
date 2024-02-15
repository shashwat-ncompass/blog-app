import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn({ name: 'ROLE_ID' })
  roleId: number;

  @Column({ name: 'VIEWER', default: false })
  viewer: boolean;

  @Column({ name: 'EDITOR', default: false })
  editor: boolean;

  @Column({ name: 'ADMIN', default: false })
  admin: boolean;

  @Column({ name: 'SUPER_ADMIN', default: false })
  superAdmin: boolean;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
