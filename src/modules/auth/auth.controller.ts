import { Request, Response } from "express";
import ResponseExpress from "../../common/adapters/responseExpressAdapter";
import { LoginService } from "./services/login.service";

class AuthController {
  public async login(req: Request, res: Response) {
    const responseExpress = new ResponseExpress();
    try {
      if (req.headers.authorization === undefined) {
        return responseExpress.errorResponse(
          res,
          new Error("Please provide WWW-Authorization using basic in headers with base 64 encoding"),
        );
      }

      const encoded = req.headers.authorization.split(" ")[1];

      const decoded = Buffer.from(encoded, "base64").toString();
      const email = decoded.split(":")[0];
      const password = decoded.split(":")[1];

      const service = new LoginService();
      const result = await service.main(email, password);

      return responseExpress.successResponse(res, result);
    } catch (error: any) {
      return responseExpress.errorResponse(res, error);
    }
  }
}

export default AuthController;
