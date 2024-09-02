import dotenv from 'dotenv-flow'
dotenv.config({ silent: true });

import express, { Application } from "express";
import helmet from 'helmet'
import morgan from "morgan";
import cors from "cors";
import { firstValueFrom } from 'rxjs'
import MongoConnection from "../../../common/config/configMongoConnection";
import { ParalellQueueAdapter } from '../../../common/adapters/paralellQueueAdapter'

import setupSwagger from '../../../common/config/swaggerConfig';

//routes
import storesRoutes from "../../stores/stores.routes";
import authRoutes from "../../auth/auth.routes";

// sockets config
import http from 'http';
import { SocketIOConfig } from '../../../common/config/configSocketConnection';

export default class Server {
  static readonly DEFAULT_PORT = 3001;
  public static instance: Server;
  public app: Application;
  public mongoConnection!: MongoConnection;
  private port: number;
  private httpServer!: http.Server;

  private apiPath = {
    stores: "/api/v1/stores",
    auth: "/api/v1/auth",
  };

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || Server.DEFAULT_PORT;
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }

    return Server.instance;
  }

  public async init(): Promise<Server> {
    try {
      this.mongoConnection = MongoConnection.getInstance();
      await this.listenStatusConnection();
      this.startSocket();
      return this
    } catch (error) {
      const _error = error as Error
      throw new Error(`[Error] In Server init; Error: ${_error}`);
    }
  }

  private startSocket(): void {
    this.httpServer = http.createServer(this.app); // Create an HTTP server with the Express app
    SocketIOConfig.getInstance(this.httpServer); // Initialize Socket.IO
  }

  public getApp(): Application {
    return this.app
  }

  async databaseInit(): Promise<void> {
    const mongoConnections: Promise<any>[] = [];
    mongoConnections.push(this.mongoConnection.statusReadConnection.toPromise());
    mongoConnections.push(this.mongoConnection.statusWriteConnection.toPromise());
    const paralellQueueAdapter = new ParalellQueueAdapter(
      mongoConnections,
      20,
      20000
    )
    paralellQueueAdapter.execute()
    await firstValueFrom(paralellQueueAdapter.statusFinishTasks)
  }

  private async listenStatusConnection(): Promise<void> {
    try {
      await this.databaseInit();
      this.middlewares();
      this.routes();
    } catch (error) {
      throw new Error(`[Error] Error en la conexión de la db; Error: ${error}`);
    }
  }

  private middlewares(): void {
    setupSwagger(this.app);
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.get('/', (req, res) => res.status(200).json({ ok: true }));
  }

  private routes(): void {
    this.app.use(this.apiPath.stores, storesRoutes);
    this.app.use(this.apiPath.auth, authRoutes);
  }

  public listen(): void {
    /*this.app.listen(this.port, () => {
      console.log(`[Info] Server running at port: ${this.port}`);
      console.log(`[DOC] http://localhost:${this.port}/api-docs/`)
    })
    */
    this.httpServer.listen(this.port, () => {
      console.log(`[Info] Server running at port: ${this.port}`);
      console.log(`[DOC] http://localhost:${this.port}/api-docs/`);
    });
  }

  public async close(): Promise<void> {
    if (this.mongoConnection.clientRead) {
      await this.mongoConnection.clientRead.close();
    }
    if (this.mongoConnection.clientWrite) {
      await this.mongoConnection.clientWrite.close();
    }
    console.log('[Info] MongoDB connections closed.');
  }
}