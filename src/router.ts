import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/common/Layout/Layout';
import EventPage from './components/pages/Event/EventPage';
import FlightDetailPage from './components/pages/FlightDetail/FlightDetailPage';
import FlightsSearchPage from './components/pages/FlightsSearch/FlightsSearchPage';
import GroupDetailPage from './components/pages/GroupDetail/GroupDetailPage';
import HomePage from './components/pages/Home/HomePage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import Privacy from './components/pages/Policies/Privacy';
import Security from './components/pages/Policies/Security';
import TermsOfService from './components/pages/Policies/TermsOfService';
import VulnerabilityDisclosure from './components/pages/Policies/VulnerabilityDisclosure';
import QueuesPage from './components/pages/Queues/QueuesPage';
import TravelerDetailPage from './components/pages/TravelerDetail/TravelerDetailPage';
import TripDetailsPage from './components/pages/TripDetails/TripDetailsPage';
import WaiverPage from './components/pages/Waiver/WaiverPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/flights/:id',
        Component: FlightDetailPage,
      },
      {
        path: '/trips/:id',
        Component: TripDetailsPage,
      },
      {
        path: '/flights/search',
        Component: FlightsSearchPage,
      },
      {
        path: '/queues',
        Component: QueuesPage,
      },
      {
        path: '/events/:id',
        Component: EventPage,
      },
      {
        path: '/traveler/:id',
        Component: TravelerDetailPage,
      },
      {
        path: '/group/:id',
        Component: GroupDetailPage,
      },
      {
        path: '/waiver/:id',
        Component: WaiverPage,
      },
      {
        path: '/terms',
        Component: TermsOfService,
      },
      {
        path: '/security',
        Component: Security,
      },
      {
        path: '/privacy',
        Component: Privacy,
      },
      {
        path: '/lumo-vulnerability-disclosure-policy',
        Component: VulnerabilityDisclosure,
      },
    ],
  },
  {
    path: '*', // Catch all route for undefined paths
    Component: NotFoundPage,
  },
]);

export default router;
