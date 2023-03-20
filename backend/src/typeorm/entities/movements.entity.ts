import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
  startDate: Date;

  @UpdateDateColumn()
  endDate: Date;
}
