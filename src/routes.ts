import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import GraceOfFreyja from './pages/GraceOfFreyja';
import OdinsFate from './pages/OdinsFate';

export const routeNames = {
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  home: '/',
  odinsfate: '/odinsfate',
  graceoffryja: '/freyja'
};

const routes: Array<any> = [
  {
    path: routeNames.odinsfate,
    title: 'Odin\'s Fate',
    component: OdinsFate
  },

  {
    path: routeNames.graceoffryja,
    title: 'Grace Of Freyja',
    component: GraceOfFreyja
  },
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
