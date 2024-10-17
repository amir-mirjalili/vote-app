import { PollEntity } from './poll.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserVoteEntity } from '../user-vote/user-vote.entity';

@Entity('poll_option')
export class PollOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(() => PollEntity, (poll) => poll.options, { onDelete: 'CASCADE' })
  poll: PollEntity;

  @OneToMany(() => UserVoteEntity, (userVote) => userVote.pollOption)
  voteUsers: UserVoteEntity[];
}
