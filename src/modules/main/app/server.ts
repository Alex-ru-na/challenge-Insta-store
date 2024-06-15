import dotenv from 'dotenv-flow'
dotenv.config({ silent: true });

import express, { Application } from "express";
import helmet from 'helmet'
import morgan from "morgan";
import cors from "cors";
import { firstValueFrom } from 'rxjs'
import MongoConnection from "../../../common/config/configMongoConnection";
import storesRoutes from "../../stores/infra/http/apiStores.routes";
import { ParalellQueueAdapter } from '../../../common/adapters/paralellQueueAdapter'

export default class Server {
  static readonly DEFAULT_PORT = 3001;
  public static instance: Server;
  public app: Application;
  public mongoConnection!: MongoConnection;
  private port: number;
  private apiPath = {
    stores: "/api/v1/stores",
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
      return this
    } catch (error) {
      const _error = error as Error
      throw new Error(`[Error] In Server init; Error: ${_error}`);
    }
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
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json({limit: "50mb"}));
    this.app.get('/', (req, res) => res.status(200).json({ ok: true }));
  }

  private routes(): void {
    this.app.use(this.apiPath.stores, storesRoutes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`[Info] Servidor corriendo en el puerto: ${this.port}`);
    })
  }
}