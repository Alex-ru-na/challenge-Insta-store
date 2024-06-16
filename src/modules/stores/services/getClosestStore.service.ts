// Dependencias externas
import moment from "moment-timezone";

// Schemas y models
import { requestClosestStoreSchema } from "../../stores/schemas/store.schema";
import { Client } from "../../../common/interfaces/client.interfaces";
import { RequestClosestStore, ResponseClosestStore, Store } from "../models/store.interface";

// utils
import CustomError from "../../../common/utils/errorCustom";


import { DaoStoresRepository } from "../repository/daoStores.repository";
import { DaoSearchStoreTrackRepository } from "../repository/searchStoreTrack.repository";

export class GetClosestStoreService {
  private readonly defaultTimezone = 'America/Bogota';
  private daoStoreTrackRepository = new DaoSearchStoreTrackRepository();

  public async main(requestClosestStore: RequestClosestStore, client: Client)
    : Promise<ResponseClosestStore> {
    try {
      const timezone = requestClosestStore.timezone || this.defaultTimezone;

      const { error } = requestClosestStoreSchema.validate(requestClosestStore);
      if (error) {
        throw new Error(error.message);
      }

      const daoStore = new DaoStoresRepository();
      const store = await daoStore.findClosestOpenStore(requestClosestStore);

      if (!store) {
        throw new CustomError('No se pudo encontrar una tienda disponible', 404, 'NOT_FOUND');
      }

      const responseData: ResponseClosestStore = {
        storeId: store._id,
        storeName: store.store_name,
        isOpen: store.isOpenNow,
        coordinates: store.coordinates.coordinates,
        nextDeliveryTime: this.getNextDeliveryTime(store, timezone),
      };

      await this.daoStoreTrackRepository
        .saveRequestSearchStore(requestClosestStore, responseData, client, undefined)

      return responseData as any as ResponseClosestStore;
    } catch (error) {
      await this.daoStoreTrackRepository
        .saveRequestSearchStore(requestClosestStore, undefined, client, error);
      throw error;
    }
  }

  private getNextDeliveryTime(store: Store, timezone: string): string {
    const now = moment.tz(timezone);

    const nextDeliveryTime = store.delivery_time.find(time => {
      const timeMoment = moment(time, 'HH:mm');
      return timeMoment.isAfter(now.clone().add(30, 'minutes'));
    });

    if (!nextDeliveryTime) {
      throw new Error('No hay tiempos de entrega, se debe agendar almenos 30 minutos antes');
    }

    return `${now.format('YYYY-MM-DD')}T${nextDeliveryTime}:00.000Z`;
  }
}
