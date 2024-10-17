import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollEntity } from './poll.entity';
import { PollOptionEntity } from './poll-option.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';
import { UserVoteService } from '../user-vote/user-vote.service';
import { CreateUserVoteDto } from '../user-vote/dto/create.user-vote.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollEntity)
    private pollRepository: Repository<PollEntity>,
    @InjectRepository(PollOptionEntity)
    private pollOptionRepository: Repository<PollOptionEntity>,

    private userVoteService: UserVoteService,
  ) {}

  async create(dto: CreatePollDto): Promise<PollEntity> {
    const poll = new PollEntity();
    poll.options = dto.options.map((optionData) => {
      const option = new PollOptionEntity();
      option.text = optionData.text;
      return option;
    });
    return this.pollRepository.save(poll);
  }

  async castVote(pollId: number, castVoteDto: CastVoteDto) {
    const { optionId } = castVoteDto;
    const option = await this.pollOptionRepository.findOne({
      where: { id: optionId },
      relations: ['poll'],
    });
    if (!option || option.poll.id !== pollId) {
      throw new HttpException('Invalid option or poll', HttpStatus.BAD_REQUEST);
    }
    const checkUserVote = await this.userVoteService.checkUserAlreadyVoted(
      castVoteDto.userId,
      castVoteDto.optionId,
    );
    if (checkUserVote) {
      throw new HttpException('User has already voted', HttpStatus.CONFLICT);
    }

    const userVoteDto = new CreateUserVoteDto();
    userVoteDto.userId = castVoteDto.userId;
    userVoteDto.pollOption = option;
    await this.userVoteService.create(userVoteDto);
    option.votes += 1;

    await this.pollOptionRepository.save(option);
    return { message: 'vote casted successfully ' };
  }

  async getByPollId(pollId: number): Promise<PollEntity> {
    return this.pollRepository.findOne({
      where: { id: pollId },
      relations: ['options'],
    });
  }
}
