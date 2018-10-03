import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import codepush from 'react-native-code-push';
import { YellowBox } from 'react-native';

import { store, persistor } from './store';
import Router from './Router';

import ErrorHandler from './handlers/ErrorHandler';
import SystemMessageHandler from './handlers/SystemMessageHandler';
import AuthHandler from './handlers/AuthHandler';
import DatabaseHandler from './handlers/DatabaseHandler';
import NetworkHandler from './handlers/NetworkHandler';
import LocationHandler from './handlers/LocationHandler';

import PageLoader from './components/PageLoader';

// Helper to clear local storage during development
// if (__DEV__) {
//   persistor.purge();
// }

// Disable remote debugger warnings
YellowBox.ignoreWarnings(['Remote debugger', 'Warning: isMounted(...) is deprecated']);

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<PageLoader />} persistor={persistor}>
        <ErrorHandler>
          <SystemMessageHandler>
            <AuthHandler />
            <DatabaseHandler />
            <NetworkHandler />
            <LocationHandler />
            <Router />
          </SystemMessageHandler>
        </ErrorHandler>
      </PersistGate>
    </Provider>
  );
}

export default codepush(App);
