import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteService } from './user-vote.service';

describe('UserVoteService', () => {
  let service: UserVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVoteService],
    }).compile();

    service = module.get<UserVoteService>(UserVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
