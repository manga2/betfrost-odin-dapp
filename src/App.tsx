import React from 'react';
import { DappUI, DappProvider } from '@elrondnetwork/dapp-core';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import {
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core';

import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import Staking from './pages/OdinsFate';
import { routeNames } from 'routes';
import routes from 'routes';
import '@elrondnetwork/dapp-core/build/index.css';
import { ENVIRONMENT } from './config';
import './App.scss';

const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
} = DappUI;

const Content = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  return (
    <Layout>
      <div className={hasPendingTransactions ? 'custom-background-blocker' : ''} />
      <TransactionsToastList />
      <NotificationModal />
      <SignTransactionsModals />
      <Routes>
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
  );
};

const App = () => {
  return (
    <Router>
      <DappProvider
        environment={ENVIRONMENT}
        customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
        completedTransactionsDelay={200}
      >
        <Content />
      </DappProvider>
    </Router>
  );
};

export default App;
