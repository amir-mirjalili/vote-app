import { Test, TestingModule } from '@nestjs/testing';
import { PollService } from './poll.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PollEntity } from './poll.entity';
import { PollOptionEntity } from './poll-option.entity';
import { UserVoteService } from '../user-vote/user-vote.service';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';

describe('PollService', () => {
  let service: PollService;
  let pollRepository: Repository<PollEntity>;
  let pollOptionRepository: Repository<PollOptionEntity>;
  let userVoteService: UserVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollService,
        {
          provide: getRepositoryToken(PollEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PollOptionEntity),
          useClass: Repository,
        },
        {
          provide: UserVoteService,
          useValue: {
            checkUserAlreadyVoted: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PollService>(PollService);
    pollRepository = module.get<Repository<PollEntity>>(
      getRepositoryToken(PollEntity),
    );
    pollOptionRepository = module.get<Repository<PollOptionEntity>>(
      getRepositoryToken(PollOptionEntity),
    );
    userVoteService = module.get<UserVoteService>(UserVoteService);
  });

  it('should create a poll', async () => {
    const dto: CreatePollDto = { options: [{ text: 'Option 1' }] };
    const result = { id: 1, options: [] } as PollEntity;
    jest.spyOn(pollRepository, 'save').mockResolvedValue(result);
    expect(await service.create(dto)).toBe(result);
  });

  it('should cast vote successfully', async () => {
    const option = { id: 1, votes: 0, poll: { id: 1 } } as PollOptionEntity;

    jest.spyOn(pollOptionRepository, 'findOne').mockResolvedValue(option);
    jest
      .spyOn(userVoteService, 'checkUserAlreadyVoted')
      .mockResolvedValue(false);
    jest.spyOn(userVoteService, 'create').mockResolvedValue({} as any);
    const saveSpy = jest
      .spyOn(pollOptionRepository, 'save')
      .mockResolvedValue({} as any);

    const result = await service.castVote(1, { optionId: 1, userId: 1 });

    expect(userVoteService.create).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalledWith({ ...option, votes: 1 });
    expect(result).toEqual({ message: 'vote casted successfully ' });
  });

  it('should return poll results', async () => {
    const pollId = 1;
    const poll = { id: pollId, options: [] } as PollEntity;
    jest.spyOn(pollRepository, 'findOne').mockResolvedValue(poll);
    expect(await service.getByPollId(pollId)).toBe(poll);
  });
});
