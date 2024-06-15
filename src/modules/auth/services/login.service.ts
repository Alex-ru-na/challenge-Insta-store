// Librerias
import dotenvFlow from "dotenv-flow";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

// Paquetes
import { comparePassword } from "../../../common/adapters/encrypting";

import { Client } from "../../../common/interfaces/client.interfaces";
import { DaoClientRepository } from "../../clients/repository/daoClient.repository";

// Configuraciones
dotenvFlow.config({ silent: true });

// Key
const privateKey = fs.readFileSync(
  path.basename("../../../../jwtRS256.key"),
  "utf-8",
);

export class LoginService {
  private clientRepository = new DaoClientRepository();

  public async main(email: string, password: string) {
    const user = await this.clientRepository.getClient(email);
    if(!user) throw new Error('Unauthorized');

    const isEqual = await comparePassword(password, user.hash!);
    if (!isEqual) throw new Error('Unauthorized');

    const result = await this.getToken(user);
    return result;
  }

  private async getToken(user: Client) {
    const objToken = {
      _id: user._id.toString(),
      email: user.email,
      timezone: user.timezone,
    };

    const token = jwt.sign(
      { ...objToken },
      {
        key: privateKey,
        passphrase: process.env.PHRASE_KEY_JWT as string || "",
      },
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
        algorithm: "RS256",
      },
    );

    return {
      data: user.email,
      token,
      msg: "token successfully obtained",
    };

  }
}
