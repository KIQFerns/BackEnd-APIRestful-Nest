import { User } from '@prisma/client';
import { Request } from 'express';

export class AuthRequestModel extends Request {
  user: User;
}
