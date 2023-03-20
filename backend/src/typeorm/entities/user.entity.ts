import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole, EnglishLevel } from '../../users/enums';
import { Exclude } from 'class-transformer';
import { Account } from './account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: EnglishLevel,
    nullable: true,
  })
  @Column({ name: 'english_level', nullable: true })
  englishLevel: string;

  @Column({ name: 'cv_link', nullable: true })
  CVLink: string;

  @Column({ name: 'technical_knowledge', nullable: true })
  technicalKnowledge: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => Account, (account) => account.users)
  account: Account;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
