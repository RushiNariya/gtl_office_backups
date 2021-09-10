import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath: string = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

type configType = {
  env: string;
  db: string;
  salt: string;
  realtimeAppHost: string;
}

const config: configType = {
  env: process.env.NODE_ENV,
  db: process.env.MONGODB_URL,
  salt: process.env.SALT,
  realtimeAppHost: process.env.REALTIME_APP_HOST,
};

if (config.env !== 'production') {
  console.log(`App Config: ${JSON.stringify(config, null, 2)}`);
}

export {
  config
};