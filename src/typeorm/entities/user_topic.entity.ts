import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity()
export class UserTopic {

  @PrimaryColumn({ name: 'USER_ID', length: 200, nullable: false, unique: true })
  userId: string;

  @Column()
  topicId: string;

  @Column({ name: 'EDITOR', default: false })
  editor: boolean;

  @Column({ name: 'VIEWER', default: false })
  viewer: boolean;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp' })
  updatedAt: Date;
}
