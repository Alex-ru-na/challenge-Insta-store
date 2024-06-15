import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

interface SignTokenServiceProps {
  payload?: string | object | Buffer,
  options?: jwt.SignOptions,
}

export class SignTokenService {
  static readonly TOKEN_ALGORITHM = "RS256"
  private readonly PRIVATE_KEY = fs.readFileSync(
    path.basename("./jwtPrivateRS256.key"),
    "utf8"
  );

  public main({ payload = "", options }: SignTokenServiceProps): string {
    if (!this.PRIVATE_KEY) {
      throw new Error("[Error] SignTokenService: PRIVATE_KEY undefined");
    }
    const passphrase = process.env.PHRASE_KEY_JWT || "";
    if (!passphrase || passphrase === "") {
      throw new Error("PHRASE_KEY_JWT undefined");
    }

    const signedToken = jwt.sign(
      payload,
      { key: this.PRIVATE_KEY, passphrase },
      {
        algorithm: SignTokenService.TOKEN_ALGORITHM,
        expiresIn: options?.expiresIn,
      }
    );

    return signedToken;
  }
}