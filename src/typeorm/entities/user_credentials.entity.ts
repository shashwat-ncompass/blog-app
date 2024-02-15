import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class UserCredential {
  @PrimaryColumn({ name: 'ID' })
  id: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}

export type UserCredentialData = Partial<Omit<UserCredential, 'createdAt' | 'updatedAt'>>;