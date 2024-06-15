import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";
import path from "path";

export class VerifyTokenService {
  static readonly TOKEN_ALGORITHM = "RS256"
  private readonly PUBLIC_KEY = fs.readFileSync(
    path.basename("./jwtPublicRS256.key"),
    "utf8"
  );

  public main(token: string): string | JwtPayload {
    try {
    const decoded = jwt.verify(
      token,
      this.PUBLIC_KEY,
      {
        algorithms: [ VerifyTokenService.TOKEN_ALGORITHM ],
      }
    );

    return decoded;
    } catch (error) {
      console.error(`[Error] In VerifyTokenService; Invalid token`);
      throw new Error('Invalid token');
    }
  }
}