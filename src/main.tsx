
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App.tsx'
import './index.css'
import { relayStylePagination } from '@apollo/client/utilities';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { persistore, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';



const MY_TOKEN = import.meta.env.VITE_API_KEY;
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: relayStylePagination(['query']),
        },
      },
    },
  }),
  headers: {
    Authorization: `Bearer ${MY_TOKEN}`
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistore}>
          <App />
        </PersistGate>
        
      </ApolloProvider>
    </Provider>

  </BrowserRouter>



)
