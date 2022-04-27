import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import GraceOfFryja from './pages/GraceOfFryja';
import OdinsFate from './pages/OdinsFate';

export const routeNames = {
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  home: '/',
  odinsfate: '/odinsfate',
  graceoffryja: '/graceoffryja'
};

const routes: Array<any> = [
  {
    path: routeNames.odinsfate,
    title: 'Odin\'s Fate',
    component: OdinsFate
  },

  {
    path: routeNames.graceoffryja,
    title: 'Grace Of Fryja',
    component: GraceOfFryja
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
