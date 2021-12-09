import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.comments, {
    onDelete: 'CASCADE',
  })
  ticket: TicketEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    nullable: false,
  })
  user: UserEntity;
}
