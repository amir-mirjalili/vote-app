import { Test, TestingModule } from '@nestjs/testing';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';

describe('PollController', () => {
  let controller: PollController;
  let pollService: PollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollController],
      providers: [
        {
          provide: PollService,
          useValue: {
            create: jest.fn(),
            castVote: jest.fn(),
            getByPollId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PollController>(PollController);
    pollService = module.get<PollService>(PollService);
  });

  it('should create a poll', async () => {
    const dto: CreatePollDto = { options: [{ text: 'Option 1' }] };
    await controller.createPoll(dto);
    expect(pollService.create).toHaveBeenCalledWith(dto);
  });

  it('should cast a vote', async () => {
    const pollId = 1;
    const dto: CastVoteDto = { optionId: 1, userId: 1 };
    await controller.castVote(pollId, dto);
    expect(pollService.castVote).toHaveBeenCalledWith(pollId, dto);
  });

  it('should get poll results', async () => {
    const pollId = 1;
    await controller.getPollResults(pollId);
    expect(pollService.getByPollId).toHaveBeenCalledWith(pollId);
  });
});
