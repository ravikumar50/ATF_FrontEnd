import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: "3bd9f365-c333-4590-9b07-f6cd62fa936b",
    authority: "https://login.microsoftonline.com/c6326554-6b7c-4df2-85c1-d8f8c3824de9",
    redirectUri: "https://demonewlook-drftaegrg5gyeyff.canadacentral-01.azurewebsites.net"
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')).render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </MsalProvider>
);
