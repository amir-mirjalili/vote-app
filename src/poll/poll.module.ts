import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollEntity } from './poll.entity';
import { PollOptionEntity } from './poll-option.entity';
import { VoteGateway } from '../gateways/vote-gateway';
import { UserVoteModule } from '../user-vote/user-vote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollEntity, PollOptionEntity]),
    UserVoteModule,
  ],
  providers: [PollService, VoteGateway],
  controllers: [PollController],
})
export class PollModule {}
