import DefaultLayout from '@structure/layout/DefaultLayout';
import Login from '@structure/pages/Login/Login';
import { createBrowserRouter } from 'react-router-dom';
import { studentRoutes } from './student';
import noteRoute from './note';
import targetRoute from './target';
import overViewRoute from './overview';
import calendarRoute from './calendar';
import registerRoute from './register';
import currentScheduleRoute from './currentSchedule';

const routes = createBrowserRouter([
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...studentRoutes],
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...noteRoute],
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...targetRoute],
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...overViewRoute],
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...calendarRoute],
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...registerRoute],
   },
   {
      path: '/',
      element: <DefaultLayout />,
      children: [...currentScheduleRoute],
   },
]);
export default routes;
