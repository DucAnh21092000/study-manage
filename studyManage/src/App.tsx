import BreadcrumbProvide from '@components/breadcrumb/Breadcrumb';
import LazyLoading from '@components/loading/LazyLoading';
import { LoadingProvide } from '@components/loading/Loading';
import routes from '@structure/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import './i18n/i18n';
import i18n from './i18n/i18n';

i18next.init({
   interpolation: { escapeValue: false },
});
function App() {
   return (
      <div className="root">
         <LoadingProvide>
            <I18nextProvider i18n={i18n}>
               <BreadcrumbProvide>
                  <RouterProvider
                     router={routes}
                     fallbackElement={<LazyLoading />}
                  />
               </BreadcrumbProvide>
            </I18nextProvider>
         </LoadingProvide>
      </div>
   );
}

export default App;
