import { Response } from "express";
import { JoiValidationError } from "../utils/joi-error";
import CustomError from "../utils/errorCustom";

class ResponseExpress {

  successResponse(res: Response, data: any) {
    return res.status(200).json({ ...data, ok: true });
  }

  errorResponse(res: Response, data: Error) {
    const errorMessage: any = {
      error: data.message,
      name: data.name,
      stack: data?.stack,
      ok: false,
    };

    if (data instanceof JoiValidationError) {
      return res.status(400).json({ ...errorMessage, details: data.getDetails() });
    }

    if (data instanceof CustomError) {
      const { statusCode, errorCode } = data;
      return res.status(statusCode).json({ ...errorMessage, });
    }

    return res.status(400).json(errorMessage);
  }

  authErrorResponse(res: Response, data: Error) {
    return res.status(401).json({
      error: data.message,
      name: data.name,
      stack: data?.stack,
      ok: false,
    });
  }
}
export default ResponseExpress;
