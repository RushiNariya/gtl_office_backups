import express from 'express';
import { graphqlHTTP } from 'express-graphql';
const cors = require('cors');
import resolver from './resolver';
import schema from './schema';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('server is runnig.');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.listen(8080, () => console.log('Server is running on 8080'));
