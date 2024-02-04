import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { EStatus } from '../../enum';
import ListPlanTable from './ListPlanTable';
import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';

const ListPlan = () => {
   const { setBreadcrumb } = useBreadcumb();
   const { t } = useTranslation();
   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');
      setBreadcrumb([
         {
            text: userData.profileName,
         },
         {
            text: t('Common_List_Schedule'),
         },
      ]);
   }, []);

   const [selectedTab, setSelectedTab] = useState<EStatus | string>(
      EStatus.active
   );
   const items: TabsProps['items'] = [
      {
         key: EStatus.active.toString(),
         label: t('Common_Active'),
         children: <ListPlanTable type={selectedTab} />,
      },
      {
         key: EStatus.draf.toString(),
         label: t('Common_InActive'),
         children: <ListPlanTable type={selectedTab} />,
      },
   ];

   return (
      <div style={{ padding: '32px 64px' }}>
         <div className="">
            <Tabs items={items} onChange={(value) => setSelectedTab(value)} />
         </div>
      </div>
   );
};
export default ListPlan;
