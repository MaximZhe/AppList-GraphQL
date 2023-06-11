import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient,ApolloProvider, InMemoryCache} from '@apollo/client';
import App from './App.tsx'
import './index.css'
import { relayStylePagination } from '@apollo/client/utilities';


const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Reusable helper function to generate a field
          // policy for the Query.search field, keyed by
          // search query:
          search: relayStylePagination(['query']),
        },
      },
    },
  }),
  headers: {
    Authorization: `Bearer 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`
  }
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
<App />
  </ApolloProvider>
    
  
)
