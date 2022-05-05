import React from 'react';
import { DappUI, DappProvider } from '@elrondnetwork/dapp-core';
import { Notifications } from 'react-push-notification';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import routes from 'routes';
import '@elrondnetwork/dapp-core/build/index.css';
import { ENVIRONMENT } from './config';
import UnlockPage from './pages/UnlockPage';


const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
} = DappUI;

const App = () => {
  return (
    <Router>
      <DappProvider
        environment={ENVIRONMENT}
        customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
        completedTransactionsDelay={200}
      >
        <Layout>
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals />
          <Notifications />
          <Routes>
            <Route
              path={routeNames.unlock}
              element={<UnlockPage loginRoute={routeNames.home} />}
            />
            {routes.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}
            <Route path="/" element={<Navigate replace to={routeNames.odinsfate} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </DappProvider>
    </Router>
  );
};

export default App;
