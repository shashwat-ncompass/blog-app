import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('USER_TOPIC')
export class UserTopic {
  @PrimaryColumn({ name: 'TOPIC_ID', length: 200 })
  topicId: string;

  @PrimaryColumn({ name: 'USER_ID', length: 200 })
  userId: string;

  @Column({ name: 'EDITOR', default: false })
  editor: boolean;

  @Column({ name: 'VIEWER', default: false })
  viewer: boolean;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
