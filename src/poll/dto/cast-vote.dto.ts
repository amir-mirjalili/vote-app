import { IsNumber } from 'class-validator';

export class CastVoteDto {
  @IsNumber()
  optionId: number;
  @IsNumber()
  userId: number;
}
