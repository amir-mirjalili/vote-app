import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from './poll.entity';
import { PollOption } from './poll-option.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
    @InjectRepository(PollOption)
    private pollOptionRepository: Repository<PollOption>,
  ) {}

  async create(dto: CreatePollDto): Promise<Poll> {
    const poll = new Poll();
    poll.options = dto.options.map((optionData) => {
      const option = new PollOption();
      option.text = optionData.text;
      return option;
    });
    return this.pollRepository.save(poll);
  }

  async castVote(pollId: number, castVoteDto: CastVoteDto): Promise<void> {
    const { optionId } = castVoteDto;
    const option = await this.pollOptionRepository.findOne({
      where: { id: optionId },
      relations: ['poll'],
    });
    if (!option || option.poll.id !== pollId) {
      throw new Error('Invalid option or poll');
    }
    option.votes += 1;
    await this.pollOptionRepository.save(option);
  }

  async getByPollId(pollId: number): Promise<Poll> {
    return this.pollRepository.findOne({
      where: { id: pollId },
      relations: ['options'],
    });
  }
}
