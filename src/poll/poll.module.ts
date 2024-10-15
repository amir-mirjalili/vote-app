import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './poll.entity';
import { PollOption } from './poll-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, PollOption])],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
