import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import RoutePath from '@structure/routes/path';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import style from './OverView.module.scss';
import TargetOverView from './component/TargetOverView';
import NoteOverView from './component/NoteOverView';
import { useTranslation } from 'react-i18next';

const Overview = () => {
   const { setBreadcrumb } = useBreadcumb();
   const { t } = useTranslation();

   const tabItems = [
      {
         label: t('Common_List_Target'),
         key: 'listTarget',
         children: <TargetOverView />,
      },
      {
         label: t('Common_List_Note'),
         key: 'listNote',
         children: <NoteOverView />,
      },
   ];

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');

      setBreadcrumb([
         {
            path: '/',
            text: userData.profileName,
         },
         {
            path: RoutePath.overView,
            text: t('Common_Overview'),
         },
      ]);
   }, []);

   return (
      <div className={style.overview}>
         <Tabs items={tabItems} />
      </div>
   );
};

export default Overview;
