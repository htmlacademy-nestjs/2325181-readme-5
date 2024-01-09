import { TokenPayload } from './token-payload.interface';

export interface RequestWithToken {
  user?: TokenPayload;
}
