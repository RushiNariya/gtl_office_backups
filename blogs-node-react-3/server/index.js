import express from 'express';
import path from 'path';
require("dotenv").config();
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import mongoose from 'mongoose';
import resolver from './resolvers/resolver';
import schema from './schema/schema';
import imageRouter from './routes/ImageRoute';
import { ensureToken } from './utils/jwtUtils';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public','images')));

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.belip.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.once('open', () => {
  console.log('connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('server is running.');
});

const context = async () => {
  const AuthorizedUser = await ensureToken();

  return { AuthorizedUser };
  
};

app.use('/image', imageRouter);

app.use(
  '/graphql',
  graphqlHTTP(async (request, response, graphQLParams) =>  ({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    context: async () => {
      const user = await ensureToken(request);
      return user;
    }
  }))
);

app.listen(8080, () => console.log('Server is running on 8080'));
