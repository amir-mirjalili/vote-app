import { Injectable } from '@nestjs/common';
import { UserVoteEntity } from './user-vote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserVoteDto } from './dto/create.user-vote.dto';

@Injectable()
export class UserVoteService {
  constructor(
    @InjectRepository(UserVoteEntity)
    private readonly userVoteRepository: Repository<UserVoteEntity>,
  ) {}

  async create(dto: CreateUserVoteDto): Promise<UserVoteEntity> {
    try {
      const userVote = this.userVoteRepository.create({
        userId: dto.userId,
        pollOption: dto.pollOption,
      });
      return await this.userVoteRepository.save(userVote);
    } catch (e) {
      console.error(e);
    }
  }

  async checkUserAlreadyVoted(
    userId: number,
    pollOptionId: number,
  ): Promise<boolean> {
    try {
      const data = await this.userVoteRepository.count({
        where: {
          userId,
          pollOption: {
            id: pollOptionId,
          },
        },
        relations: ['pollOption'],
      });
      return data > 0;
    } catch (e) {
      console.error(e);
    }
  }
}
