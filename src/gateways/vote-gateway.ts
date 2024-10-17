import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PollService } from '../poll/poll.service';
import { CastVoteDto } from '../poll/dto/cast-vote.dto';

@WebSocketGateway(80, { cors: { origin: '*' } })
export class VoteGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly pollService: PollService) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  broadcastNewVote(pollId: number): void {
    this.pollService.getByPollId(pollId).then((pollResults) => {
      const notification = {
        message: `a new vote has been cast${pollId}`,
        pollResults,
      };
      this.server.emit(`cast-vote-${pollId}`, notification);
    });
  }

  @SubscribeMessage('vote')
  handleVote(
    @MessageBody() data: { pollId: number; optionId: number; userId: number },
  ): void {
    const dto = new CastVoteDto();
    dto.optionId = data.optionId;
    dto.userId = data.userId;
    this.pollService.castVote(data.pollId, dto).then(() => {
      this.broadcastNewVote(data.pollId);
    });
  }
}
