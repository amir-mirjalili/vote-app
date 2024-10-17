import { IsNumber } from 'class-validator';
import { PollOptionEntity } from '../../poll/poll-option.entity';

export class CreateUserVoteDto {
  @IsNumber()
  userId: number;
  pollOption: PollOptionEntity;
}
