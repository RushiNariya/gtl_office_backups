import express from 'express';
import { createServer } from 'http';
import { PubSub } from 'apollo-server';
import { ApolloServer, gql } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const pubsub = new PubSub();
const ARTICAL_CREATED = 'ARTICAL_CREATED';
const articals = [
  {
    id: 0,
    title: 'React',
    content: 'React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.',
  },
  {
    id: 1,
    title: 'GraphQL',
    content: 'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.',
  },
];

const typeDefs = gql`
  type Query {
    articals: [Articals!]!
  }

  type Mutation {
    articalCreated(title: String!, content: String!): Articals!
  }

  type Articals {
    id: String
    title: String
    content: String
  }
`;

const resolvers = {
  Query: {
    articals: () => (articals)
  },
  Mutation: {
    articalCreated: (parent, { title, content, id }) => {
      id = uuidv4();
      const artical = {
        id,
        title,
        content,
      };
      articals.push(artical)
      return artical;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

