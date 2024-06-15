import { SignTokenService } from './signToken.service';
import { SignOptions } from 'jsonwebtoken';

interface CreateTokenServiceProps {
  payload?: string | object | Buffer,
  options?: SignOptions,
}

export class CreateTokenService {
  public main({ payload, options }: CreateTokenServiceProps): string {
    const signTokenService = new SignTokenService();
    const token = signTokenService.main({ payload, options });
    return token;
  }
}
