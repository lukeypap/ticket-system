import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  message: string;
}
