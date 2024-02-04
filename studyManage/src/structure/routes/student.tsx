import CreatePlan from '@structure/pages/Student/create-plan/CreatePlan';
import ListPlan from '@structure/pages/Student/create-plan/ListPlan/ListPlan';
import DetailPlan from '@structure/pages/Student/create-plan/detail-plan/DetailPlan';
import RoutePath from './path';

export const studentRoutes = [
   {
      path: RoutePath.listPlan,
      element: <ListPlan />,
   },
   {
      path: RoutePath.createPlan,
      element: <CreatePlan />,
   },
   {
      path: RoutePath.detailPlan,
      element: <DetailPlan />,
   },
];
