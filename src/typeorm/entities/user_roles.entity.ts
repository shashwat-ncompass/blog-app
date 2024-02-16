import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryColumn({ name: 'USER_ID' })
  userId: string;

  @Column({ name: 'VIEWER', default: true })
  viewer: boolean;

  @Column({ name: 'EDITOR', default: false })
  editor: boolean;

  @Column({ name: 'ADMIN', default: false })
  admin: boolean;

  @Column({ name: 'SUPERADMIN', default: false })
  superAdmin: boolean;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
