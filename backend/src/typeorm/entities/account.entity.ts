import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_name', unique: true, nullable: false })
  accountName: string;

  @Column({ name: 'client_name', nullable: false })
  clientName: string;

  @Column({ name: 'operation_manager_name', nullable: false })
  operationManagerName: string;

  @OneToMany(() => User, (user) => user.account)
  users: User[];
}
