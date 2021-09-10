import * as crypto from 'crypto';
import { config } from './config';

const getHash = (password): string => crypto.scryptSync(password, config.salt, 32).toString('hex');

export {
  getHash
};