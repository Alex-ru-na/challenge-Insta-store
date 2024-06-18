import { HttpStatus } from "../enums/httpStatusEnum";
import { getHttpErrorClassArgs } from "../helpers/httpErrorsHelper";
import { HttpError, HttpErrorMessageArgs } from "./httpError";

export class NotFoundError extends HttpError {
  constructor(args: string | HttpErrorMessageArgs = "Not found") {
    super(getHttpErrorClassArgs(args, HttpStatus.NOT_FOUND));

    this.name = "NotFoundError";
  }
}
