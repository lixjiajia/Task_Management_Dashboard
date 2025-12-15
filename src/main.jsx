import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloclient";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);