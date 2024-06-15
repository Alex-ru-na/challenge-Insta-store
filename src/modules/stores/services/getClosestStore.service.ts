// dependencias externas
import moment from "moment-timezone";

//
import { DaoStoresRepository } from "../repository/daoStoresRepository";

// schemas y models
import { clientSchema } from "../schemas/client.schema";
import { Client } from "../../../common/interfaces/client.interfaces";
import { ResponseClosestStore, Store } from "../models/store.interface";


export class GetClosestStoreService {
  private readonly DEFAULT_TIME_ZONE = 'America/Bogota';

  public async main(client: Client) : Promise<ResponseClosestStore> {
    try {
      const { error } = clientSchema.validate(client);
      if (error) {
        throw new Error(error.message);
      }

      const dao = new DaoStoresRepository();
      const stores = await dao.findClosestOpenStore(client);

      if (!stores) {
        throw new Error("No se encontraron tiendas disponibles")
      }

      const store = stores[0];

      const result : ResponseClosestStore = {
        storeId: store._id,
        storeName: store.store_name,
        isOpen: store.isOpenNow,
        coordinates: store.coordinates.coordinates,
        nextDeliveryTime: this.getNextDeliveryTime(store),
      };

      return result as any as ResponseClosestStore;
    } catch (error) {
      const errorMessage = `[Error] In GetClosestStoreService; ${error}`
      throw new Error(errorMessage);
    }
  }

  private getNextDeliveryTime(store: Store): string {
    const now = moment.tz(this.DEFAULT_TIME_ZONE);

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
