import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PollOptionEntity } from '../poll/poll-option.entity';

@Entity()
export class UserVoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pollOptionId: number;
  @Column()
  userId: number;
  @ManyToOne(() => PollOptionEntity, (pollOption) => pollOption.votes, {
    onDelete: 'CASCADE',
  })
  pollOption: PollOptionEntity;
}
