import { Request, Response } from "express";
import { GetClosestStoreService } from "./services/getClosestStore.service";
import ResponseExpress from "../../common/adapters/responseExpressAdapter";
import CustomError from "../../common/utils/errorCustom";

class GetStoresController {
  public async getClosestStore(req: Request, res: Response) {
    const responseExpress = new ResponseExpress();
    try {
      const getClosestStoreService = new GetClosestStoreService();
      const { clientData, ...requestBody } = req?.body;
      if(!requestBody) throw new Error("body is require");

      let result = await getClosestStoreService.main(requestBody);
      return responseExpress.successResponse(res, result);
    } catch (error: any) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}

export default GetStoresController;
