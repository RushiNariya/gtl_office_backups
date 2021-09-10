import * as fs from 'fs';
import * as path from 'path';
import { buildSchema } from 'graphql';

const schema: string = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf8' });

export default buildSchema(schema);
