import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'ID', length: 200 })
  id: string;

  @Column({ name: 'NAME', length: 200 })
  name: string;

  @Column({ name: 'EMAIL', length: 200 })
  email: string;

  @Column({ name: 'ROLE_ID', length: 200 })
  roleId: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
