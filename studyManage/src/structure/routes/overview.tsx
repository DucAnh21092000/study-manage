import Overview from '@structure/pages/overview/Overview';
import RoutePath from './path';
const overViewRoute = [
   {
      path: '/',
      element: <Overview />,
   },
   {
      path: RoutePath.overView,
      element: <Overview />,
   },
];

export default overViewRoute;
