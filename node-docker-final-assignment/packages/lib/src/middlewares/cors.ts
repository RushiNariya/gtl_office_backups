import { NextFunction, Response, Request } from 'express';

const cors = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();

  return null;
};

export {
  cors
};