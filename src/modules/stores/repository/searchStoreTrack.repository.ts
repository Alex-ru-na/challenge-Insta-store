import moment from "moment-timezone";

import { DataBase, Collections } from "../../../common/utils/helpers/databaseEnums";
import MongoConnection from '../../../common/config/configMongoConnection';
import { RequestClosestStore, ResponseClosestStore } from "../models/store.interface";
import { Client } from "../../clients/models/client.interfaces";
import { InsertOneResult } from "mongodb";

export class DaoSearchStoreTrackRepository {
  private readonly defaultTimezone = 'America/Bogota';
  private clientMongoConnectionWrite = MongoConnection.getInstance().getClientWrite();

  public async saveRequestSearchStore(
    requestClosestStore: RequestClosestStore,
    responseClosestStore: ResponseClosestStore | undefined,
    client: Client,
    error: unknown,)
    : Promise<InsertOneResult> {
    try {
      return await this.clientMongoConnectionWrite
        .db(DataBase.name)
        .collection(Collections.track)
        .insertOne({
          request: requestClosestStore,
          response: responseClosestStore,
          client,
          date: moment().tz(client.timezone || this.defaultTimezone).toDate(),
          error: error || undefined,
        })
        .then();
    } catch (error) {
      let _error = error as any;
      let message = _error?.message
        ? _error?.message
        : "Error en el metodo saveRequestSearchStore de la clase DaoSearchStoreTrackRepository";
      throw new Error(message);
    }
  }

}