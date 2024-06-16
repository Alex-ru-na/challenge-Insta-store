import { DataBase, Collections } from "../../../common/utils/helpers/databaseEnums";
import MongoConnection from '../../../common/config/configMongoConnection';
import { RequestClosestStore, StoreAggregate } from "../models/store.interface";
import moment from "moment-timezone";

export class DaoStoresRepository {
  private readonly defaultTimezone = 'America/Bogota';
  private clientMongoConnectionRead = MongoConnection.getInstance().getClientRead();

  public async getStores(query: any): Promise<any[]> {
    try {
      return await this.clientMongoConnectionRead
        .db(DataBase.name)
        .collection(Collections.store)
        .find(query)
        .toArray()
        .then();
    } catch (error) {
      let _error = error as any;
      let message = _error?.message
        ? _error?.message
        : "Error en el metodo getStores de la clase DaoStoresRepository";
      throw new Error(message);
    }
  }

  public async findClosestOpenStore(requestClosestStore: RequestClosestStore, limit: number = 1): Promise<StoreAggregate> {
    try {
      const timezone = requestClosestStore.timezone || this.defaultTimezone;

      const currentDay = moment().tz(timezone).format('dddd').toLowerCase();
      const currentTime = moment().tz(timezone).format('HH:mm');

      const aggregation = [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: requestClosestStore.coordinates
            },
            distanceField: "dist.calculated",
            spherical: true
          }
        },
        {
          $addFields: {
            isOpenNow: {
              $and: [
                { $gte: [`openingHours.${currentDay}.open`, currentTime] },
                { $lt: [currentTime, `openingHours.${currentDay}.close`] }
              ]
            }
          }
        },
        {
          $match: {
            isOpenNow: true
          }
        },
        {
          $limit: 1
        }
      ];

      const stores = await this.clientMongoConnectionRead
        .db(DataBase.name)
        .collection(Collections.store).aggregate(aggregation)
        .toArray()
        .then();

      return stores?.[0] as any as StoreAggregate;
    } catch (error) {
      let _error = error as any;
      let message = _error?.message
        ? _error?.message
        : "Error en el metodo findClosestOpenStore de la clase DaoStoresRepository";
      throw new Error(message);
    }
  }
}