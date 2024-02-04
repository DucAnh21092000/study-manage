/* eslint-disable @typescript-eslint/no-explicit-any */
import useUtil from '@commons/useUtil';
import { useLoading } from '@components/loading/Loading';
import { getScheduleByRecordId } from '@structure/apis/student';
import { ITimeLineData } from '@structure/utils';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Register = () => {
   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
   const { id } = useParams();
   const [selectedSchedule, setSelectedSchedule] = useState<ITimeLineData[]>(
      []
   );
   const { convertTimeStringToObject } = useUtil();
   const { showLoading, closeLoading } = useLoading();
   const { t } = useTranslation();
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
         title: t('Common_Registered_Quantity'),
         dataIndex: 'registered',
         key: 'registered',
      },
      {
         title: t('Common_Max_Registered_Quantity'),
         dataIndex: 'maxRegistered',
         key: 'maxRegistered',
      },
   ];
   const getScheduleById = async () => {
      try {
         showLoading();
         const { data } = await getScheduleByRecordId(id ?? '');
         const finalData = data.map((item: any) => {
            return {
               key: item.classNo,
               ...item,
            };
         });
         setSelectedSchedule(finalData);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getScheduleById();
   }, [id]);
   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
   };

   const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
   };

   return (
      <div style={{ padding: 16 }}>
         <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={selectedSchedule}
            pagination={false}
         />
      </div>
   );
};

export default Register;
