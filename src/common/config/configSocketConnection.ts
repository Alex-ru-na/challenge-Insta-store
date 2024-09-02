import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export class SocketIOConfig {
  private static instance: SocketIOConfig;
  private io: SocketIOServer | undefined;

  private constructor() { }

  public static getInstance(httpServer: HTTPServer): SocketIOConfig {
    if (!SocketIOConfig.instance) {
      SocketIOConfig.instance = new SocketIOConfig();
      SocketIOConfig.instance.initialize(httpServer);
    }
    return SocketIOConfig.instance;
  }

  private initialize(httpServer: HTTPServer): void {
    /*this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      },
      path: '/socket.io'
    });*/

    this.io = new SocketIOServer(httpServer);

    this.io.send("")

    this.io.on('connection', (socket: Socket) => {
      console.log(`[Info] New socket connection: ${socket.id}`);

      socket.on('client_message', (data) => {
        console.log(`[Info] Message received: ${data}`);
        const clientSocket = this.getIO()!.sockets.sockets.get(socket.id);
        clientSocket!.emit('chat_message', 'Message received from API Node');

        // socket.emit('chat_message', 'Message received from API Node');
      });

      socket.on('disconnect', () => {
        console.log(`[Info] Socket disconnected: ${socket.id}`);
      });
    });
  }

  public emitMessage(event: string, data: any): void {
    if (this.io) {
      this.io.emit(event, data);
    } else {
      console.error('[Error] Socket.IO server is not initialized.');
    }
  }

  public getIO(): SocketIOServer | undefined {
    return this.io;
  }
}
