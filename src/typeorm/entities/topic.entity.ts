import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryColumn({ length: 200 })
  ID: string;

  @Column({ length: 200 })
  NAME: string;

  @Column({ length: 200 })
  DESCRIPTION: string;

  @Column({ name: 'OWNER_ID', length: 200 })
  OWNER_ID: string;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp' })
  CREATED_AT: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp' })
  UPDATED_AT: Date;


}
