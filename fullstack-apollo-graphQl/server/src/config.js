import {config} from 'dotenv';
config();
const password= process.env.DB_PASS;
console(password)