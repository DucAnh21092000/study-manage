import useUtil from '@commons/useUtil';
import { getCurrentSchedule } from '@structure/apis/student';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CurrentSchedule = () => {
   const [listSchedule, setListSchedule] = useState([]);
   const { convertTimeStringToObject } = useUtil();
   const { t } = useTranslation();
   const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');

   const innitData = async () => {
      const { data } = await getCurrentSchedule(userData.studentId);
      setListSchedule(data);
      console.log(data);
   };

   useEffect(() => {
      innitData();
   }, []);

   const columns = [
      {
         title: t('Common_Day'),
         dataIndex: 'day',
         key: 'day',
      },
      {
         title: t('Common_Time'),
         dataIndex: 'time',
         key: 'time',
         render: (record: string) => {
            const time = convertTimeStringToObject(record);
            if (time) {
               return `${time.start[0]}${time.start[1]}h${time.start[2]}${time.start[3]}p -> ${time.end[0]}${time.end[1]}h${time.end[2]}${time.end[3]}p`;
            }
         },
      },
      {
         title: t('Common_Week'),
         dataIndex: 'week',
         key: 'week',
      },
      {
         title: t('Common_Subject'),
         dataIndex: 'subject',
         key: 'subject',
      },
      {
         title: t('Common_Subject_ID'),
         dataIndex: 'subjectId',
         key: 'subjectId',
      },
      {
         title: t('Common_Class_Type'),
         dataIndex: 'classType',
         key: 'classType',
      },
      {
         title: t('Common_Class_ID'),
         dataIndex: 'classNo',
         key: 'classNo',
      },
      {
         title: t('Common_Group'),
         dataIndex: 'group',
         key: 'group',
      },
   ];
   return (
      <div>
         <></>
         <Table
            columns={columns}
            dataSource={listSchedule}
            pagination={false}
            style={{ width: '100%' }}
         />
      </div>
   );
};
export default CurrentSchedule;
