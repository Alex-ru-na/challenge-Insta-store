import { DataBase, Collections } from "../../../common/utils/helpers/databaseEnums";
import MongoConnection from '../../../common/config/configMongoConnection';
import { Client } from "../../../common/interfaces/client.interfaces";

export class DaoClientRepository {
  private clientMongoConnectionRead = MongoConnection.getInstance().getClientRead();

  public async getClient(email: string): Promise<Client> {
    try {
      return await this.clientMongoConnectionRead
        .db(DataBase.name)
        .collection(Collections.client)
        .findOne({ email })
        .then();
    } catch (error) {
      let _error = error as any;
      let message = _error?.message
        ? _error?.message
        : "Error en el metodo getClient de la clase DaoClientRepository";
      throw new Error(message);
    }
  }
}