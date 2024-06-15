import { DataBase, Collections } from "../../../../common/utils/helpers/databaseEnums";
import MongoConnection from '../../../../common/config/configMongoConnection';

export class DaoStoresRepository {
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
}