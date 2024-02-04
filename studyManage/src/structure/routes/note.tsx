import RoutePath from './path';
import ListNote from '@structure/pages/note/list-note/ListNote';
const noteRoute = [
   {
      path: RoutePath.noteList,
      element: <ListNote />,
   },
];

export default noteRoute;
