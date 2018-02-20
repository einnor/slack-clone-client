import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'semantic-ui-css/semantic.min.css';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';

const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token') || null,
    'x-refresh-token': localStorage.getItem('refreshToken') || null,
    authorization: localStorage.getItem('token') || null,
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => (
  forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    return response;
  })
));

const link = middlewareLink.concat(httpLink, afterwareLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
