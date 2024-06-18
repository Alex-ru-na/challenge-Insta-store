import { NextFunction, Request, Response } from "express";
import { VerifyTokenService } from '../../modules/auth/services/verifyToken.service';

function extractTokenFromBearerToken(bearerToken: string): string {
  const bearerTokenSplit = bearerToken.split(" ");
  const [ bearerPart, token ] = bearerTokenSplit;
  const isBearerPartInvalid = bearerPart.toLocaleLowerCase() !== "bearer";
  if (isBearerPartInvalid || !token) {
    throw new Error("Invalid token");
  }
  return token;
}

export async function authToken(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerToken: string | undefined = req.headers.authorization;
    if (!bearerToken) {
      throw new Error('Invalid token');
    }
    const token = extractTokenFromBearerToken(bearerToken);

    const verifyTokenService = new VerifyTokenService();
    const tokenPayload = verifyTokenService.main(token);

    if (typeof tokenPayload === 'string') {
      req.body.clientData = { tokenPayload , token };
      next();
      return;
    }

    req.body.clientData = { ...tokenPayload, token };
    next();
  } catch (error) {
    return res.status(401).json('Invalid token');
  }
}