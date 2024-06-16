// Dependencias externas
import moment from "moment-timezone";

// Schemas y models
import { requestClosestStoreSchema  } from "../../stores/schemas/store.schema";
import { Client } from "../../../common/interfaces/client.interfaces";
import { RequestClosestStore, ResponseClosestStore, Store } from "../models/store.interface";

import { DaoStoresRepository } from "../repository/daoStoresRepository";
import CustomError from "../../../common/utils/errorCustom"

export class GetClosestStoreService {
  private readonly defaultTimezone = 'America/Bogota';

  public async main(requestClosestStore: RequestClosestStore): Promise<ResponseClosestStore> {
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

    const result: ResponseClosestStore = {
      storeId: store._id,
      storeName: store.store_name,
      isOpen: store.isOpenNow,
      coordinates: store.coordinates.coordinates,
      nextDeliveryTime: this.getNextDeliveryTime(store, timezone),
    };

    return result as any as ResponseClosestStore;
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
