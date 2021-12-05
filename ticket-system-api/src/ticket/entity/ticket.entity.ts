import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  user: string;

  @Column({ nullable: true })
  message: string;

  @Column({ default: 'open' })
  status: string;

  @Column({ nullable: true, default: 'low' })
  priority: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.ticket, {
    cascade: true,
  })
  comments: CommentEntity[];
}
