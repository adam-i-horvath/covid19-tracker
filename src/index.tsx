import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://corona-graphql.herokuapp.com/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        country(name: "Hungary") {
          deaths
          cases
          todayCases
          analysis {
            cases
            todayCases
            recovered
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
