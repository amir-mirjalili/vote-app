import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PollOptionEntity } from './poll-option.entity';

@Entity('poll')
export class PollEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PollOptionEntity, (option) => option.poll, { cascade: true })
  options: PollOptionEntity[];
}
