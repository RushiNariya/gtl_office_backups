import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { GlobalProvider } from './globalContext';
import Articals from './Aritcals/Articals';
import CreateArticals from './CreateArticals/CreateArticals';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <div>
          <h2>My first Apollo app</h2>
          <Articals />
          <CreateArticals />
        </div>
      </GlobalProvider>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
