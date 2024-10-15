// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
//
// @WebSocketGateway()
// export class VoteGateway {
//   @WebSocketServer()
//   server: Server;
//
//   broadcastVoteUpdate(pollId: string, data: any) {
//     // this.pollService.getPollResults(pollId).then((pollResults) => {
//     //   const notification = {
//     //     message: `A new poll has been cast on poll ${pollId}`,
//     //     pollResults, // includes the updated poll count for each option
//     //   };
//     // });
//     this.server.emit(`poll-update-${pollId}`, notification);
//   }
//
//   @SubscribeMessage('poll')
//   handleVote(@MessageBody() data: any): void {
//     // Handle incoming votes (can be processed here or elsewhere)
//   }
// }
