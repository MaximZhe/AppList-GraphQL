import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient,ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App.tsx'
import './index.css'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer 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`
  }
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
<App />
  </ApolloProvider>
    
  
)
