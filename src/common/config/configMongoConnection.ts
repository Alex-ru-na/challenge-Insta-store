import { MongoClient, ObjectId } from "mongodb";
import { Subject, Observable } from "rxjs";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config({silent: true });


class MongoConnection {
  public static instance: MongoConnection;

  private WriteURLConnection!: string;
  private ReadURLConnection!: string;
  public clientWrite!: MongoClient;
  public clientRead!: MongoClient;


  private _statusReadConnection = new Subject<boolean>();
  private _statusWriteConnection = new Subject<boolean>();

  public statusReadConnection: Observable<boolean>;
  public statusWriteConnection: Observable<boolean>;

  public statusRead: boolean = false;
  public statusWrite: boolean = false;

  private constructor() {
    this.statusReadConnection = this._statusReadConnection.asObservable();
    this.statusWriteConnection = this._statusWriteConnection.asObservable();
    this.setUrlConnections();
    this.init();
  }

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }

    return MongoConnection.instance;
  }

  public getClientWrite(): MongoClient {
    return this.clientWrite;
  }
  public getClientRead(): MongoClient {
    return this.clientRead;
  }

  private async init(): Promise<void> {
    await this.connectionsWrite();
    await this.connectionsRead();
  }

  public async connectionsWrite(): Promise<void> {
    try {
      this.clientWrite = await MongoClient.connect(
        this.WriteURLConnection,
      );
      if (this.clientWrite) {
        console.log("[Info] DB Write online");
      }

      this.setCompletedWriteConnection();
    } catch (error) {
      this.setErrorWriteConnection(false);
      const _error = error as Error;
      throw new Error(_error.message);
    }
  }

  public async connectionsRead(): Promise<void> {
    try {
      this.clientRead = await MongoClient.connect(
        this.ReadURLConnection
      );
      if (this.clientRead) {
        console.log("[Info] DB Read online");
      }

      this.setCompletedReadConnection();
    } catch (error) {
      this.setErrorReadConnection(false);
      const _error = error as Error;
      throw new Error(_error.message);
    }
  }

  private setCompletedWriteConnection(): void {
    this._statusWriteConnection.complete();
  }

  private setErrorWriteConnection(error: any): void {
    this._statusWriteConnection.error(error);
  }

  private setCompletedReadConnection(): void {
    this._statusReadConnection.complete();
  }

  private setErrorReadConnection(error: any): void {
    this._statusReadConnection.error(error);
  }

  public convertObjectId(id: string): ObjectId {
    return new ObjectId(id);
  }

  private setUrlConnections(): void {
    console.log({
      READ: process.env.MONGO_URL_READ,
    })
    this.WriteURLConnection = process.env.MONGO_URL_READ || "";
    this.ReadURLConnection = process.env.MONGO_URL_WRITE || "";
  }
}

export default MongoConnection;
