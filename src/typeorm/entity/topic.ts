import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('topic')
export class Topic {
  @PrimaryColumn({ length: 200 })
  ID: string;

  @Column({ length: 200 })
  NAME: string;

  @Column({ length: 200 })
  DESCRIPTION: string;

  @Column({ name: 'OWNER_ID', length: 200 })
  OWNER_ID: string;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CREATED_AT: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UPDATED_AT: Date;


}
