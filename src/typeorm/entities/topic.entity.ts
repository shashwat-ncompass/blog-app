import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryColumn({ name: 'ID', length: 200 })
  id: string;

  @Column({ name: 'NAME', length: 200 })
  name: string;

  @Column({ name: 'DESCRIPTION', length: 200 })
  description: string;

  @Column({ name: 'OWNER_ID', length: 200 })
  ownerId: string;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp' })
  updatedAt: Date;
}
