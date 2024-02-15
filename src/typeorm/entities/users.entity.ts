import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserRole } from './user_roles.entity';
import { UserCredential } from './user_credentials.entity';

@Entity()
export class User {

  @PrimaryColumn({ name: 'ID', length: 200 })
  id: string;

  @Column({ name: 'NAME', length: 200 })
  name: string;

  @Column({ name: 'EMAIL', length: 200 })
  email: string;

  @OneToOne(() => UserRole)
  @JoinColumn()
  role_details: UserRole

  @OneToOne(() => UserCredential)
  @JoinColumn()
  password_details: UserCredential

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
