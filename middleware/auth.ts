import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export default function(req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    (<any>req).user = (<any>decoded).user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}
