import { Module } from '@nestjs/common';
import { UserVoteService } from './user-vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVoteEntity } from './user-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVoteEntity])],
  providers: [UserVoteService],
  exports: [UserVoteService],
})
export class UserVoteModule {}
