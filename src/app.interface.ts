import { Request, Response } from 'express';

interface IRequestWithCookies extends Request {
  cookies: Record<string, string | undefined>;
}

export interface IGQLContext {
  req: IRequestWithCookies;
  res: Response;
}
