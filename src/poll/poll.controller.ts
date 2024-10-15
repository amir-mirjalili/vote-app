import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  createPoll(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Post(':pollId/vote')
  castVote(@Param('pollId') pollId: number, @Body() castVoteDto: CastVoteDto) {
    return this.pollService.castVote(pollId, castVoteDto);
  }

  @Get(':pollId/results')
  getPollResults(@Param('pollId') pollId: number) {
    return this.pollService.getByPollId(pollId);
  }
}
