import { DaoStoresRepository } from "../../infra/repository/daoStoresRepository";
//import axios from 'axios';

import { Client, Coordinates2D, Store} from "../models/store.models"
export class GetClosestStoreService {
  private readonly EarthRadio = 6371;

  public async main(client: Client) {
    try {
      const dao = new DaoStoresRepository();
      const stores: Store[] = await dao.getStores({});

      const closestStore = this.findClosestOpenStore(client.location, stores);

      if (!closestStore) {
        throw new Error("Damm")
      }

      return closestStore;
    } catch (error) {
      const errorMessage = `[Error] In GetShippingsRastreoService; ${error}`
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  private findClosestOpenStore(clientCoords: Coordinates2D, stores: Store[]) {
    let closestStore = null;
    let minDistance = Infinity;

    for (const store of stores) {
      if (store.isOpen) {
        const distance = this.getDistanceFromPathInKm(store.location, clientCoords);
        if (distance < minDistance) {
          closestStore = store;
          minDistance = distance;
        }
      }
    }

    return closestStore;
  }


  private getDistanceFromPathInKm(origin: Coordinates2D, destine: Coordinates2D) {
    const R = this.EarthRadio; //6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(destine.latitude - origin.latitude);
    const dLon = this.deg2rad(destine.longitude - origin.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(origin.latitude)) * Math.cos(this.deg2rad(destine.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en km
    return d;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

}
