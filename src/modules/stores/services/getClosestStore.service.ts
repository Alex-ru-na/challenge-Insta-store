// Dependencias externas
import moment from "moment-timezone";

// Schemas y models
import { clientSchema } from "../../clients/schemas/client.schema";
import { Client } from "../../../common/interfaces/client.interfaces";
import { ResponseClosestStore, Store } from "../models/store.interface";

import { DaoStoresRepository } from "../repository/daoStoresRepository";
import CustomError from "../../../common/utils/errorCustom"

const DEFAULT_TIME_ZONE = 'America/Bogota';

export class GetClosestStoreService {
  private timezone!: string;

  public async main(client: Client): Promise<ResponseClosestStore> {
    this.timezone = client.timezone || DEFAULT_TIME_ZONE;

    const { error } = clientSchema.validate(client);
    if (error) {
      throw new Error(error.message);
    }

    const daoStore = new DaoStoresRepository();
    const store = await daoStore.findClosestOpenStore(client);

    if (!store) {
      throw new CustomError('No se pudo encontrar una tienda disponible', 404, 'NOT_FOUND');
    }

    const result: ResponseClosestStore = {
      storeId: store._id,
      storeName: store.store_name,
      isOpen: store.isOpenNow,
      coordinates: store.coordinates.coordinates,
      nextDeliveryTime: this.getNextDeliveryTime(store),
    };

    return result as any as ResponseClosestStore;
  }

  private getNextDeliveryTime(store: Store): string {
    const now = moment.tz(this.timezone);

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
