import {
  IsArray,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
class PollOptionDto {
  @IsString()
  text: string;
}
export class CreatePollDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => PollOptionDto)
  options: PollOptionDto[];
}
