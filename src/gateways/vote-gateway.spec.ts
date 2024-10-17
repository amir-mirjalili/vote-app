import { Test, TestingModule } from '@nestjs/testing';
import { PollService } from '../poll/poll.service';
import { BadRequestException } from '@nestjs/common';
import { VoteGateway } from './vote-gateway';

describe('VoteGateway', () => {
  let gateway: VoteGateway;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteGateway,
        {
          provide: PollService,
          useValue: {
            castVote: jest.fn(),
            getByPollId: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<VoteGateway>(VoteGateway);
  });

  it('should throw error for missing required fields', () => {
    const data = { pollId: 1, optionId: null, userId: 1 };
    expect(() => gateway.handleVote(data)).toThrow(
      new BadRequestException(
        'Missing required fields: pollId, optionId, or userId',
      ),
    );
  });
});
