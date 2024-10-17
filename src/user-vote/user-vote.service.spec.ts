import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteService } from './user-vote.service';
import { UserVoteEntity } from './user-vote.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserVoteDto } from './dto/create.user-vote.dto';

describe('UserVoteService', () => {
  let service: UserVoteService;
  let repository: Repository<UserVoteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserVoteService,
        {
          provide: getRepositoryToken(UserVoteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserVoteService>(UserVoteService);
    repository = module.get<Repository<UserVoteEntity>>(
      getRepositoryToken(UserVoteEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user vote', async () => {
      const dto: CreateUserVoteDto = {
        userId: 1,
        pollOption: {} as any,
      };
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValue(dto as any);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(dto as any);

      const result = await service.create(dto);

      expect(createSpy).toHaveBeenCalledWith({
        userId: dto.userId,
        pollOption: dto.pollOption,
      });
      expect(saveSpy).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('checkUserAlreadyVoted', () => {
    it('should return true if user has already voted', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(1);

      const result = await service.checkUserAlreadyVoted(1, 1);

      expect(result).toBe(true);
    });

    it('should return false if user has not voted', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(0);

      const result = await service.checkUserAlreadyVoted(1, 1);

      expect(result).toBe(false);
    });
  });
});
