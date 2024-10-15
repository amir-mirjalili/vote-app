import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PollOption } from './poll-option.entity';

@Entity('poll')
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PollOption, (option) => option.poll, { cascade: true })
  options: PollOption[];
}
