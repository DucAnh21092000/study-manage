import {
   ExclamationCircleOutlined,
   FileProtectOutlined,
   FileSyncOutlined,
   FileTextOutlined,
   PlusCircleOutlined,
} from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import {
   getListTargetOverview,
   getListTargetToday,
} from '@structure/apis/overview';
import { Todo } from '@structure/pages/target/models/models';
import RoutePath from '@structure/routes/path';
import { Col, Divider, Row, Tabs, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TargetList from './TargetList';
import ListTargetToday from './ListTargetToday';
import { useTranslation } from 'react-i18next';

const TargetOverView = () => {
   const { showLoading, closeLoading } = useLoading();
   const [totalTarget, setTotalTarget] = useState<number>(0);
   const [totalCompleteTarget, setTotalCompleteTarget] = useState<Todo[]>([]);
   const [totalIncomingTarget, setTotalIncomingTarget] = useState<Todo[]>([]);
   const [listTargetToday, setListTargetToday] = useState<Todo[]>([]);
   const [totalCompleteTodayTarget, setTotalCompleteTodayTarget] = useState<
      Todo[]
   >([]);
   const [totalIncomingTodayTarget, setTotalIncomingTodayTarget] = useState<
      Todo[]
   >([]);
   const { t } = useTranslation();
   const itemTabs = [
      {
         label: t('Common_Incomming_Target'),
         children: <TargetList data={totalIncomingTodayTarget} />,
         key: 'Incomming Target',
      },
      {
         label: t('Common_Complete_Target'),
         children: <TargetList data={totalCompleteTodayTarget} />,
         key: 'Complete Target',
      },
   ];

   const [tab, setTab] = useState(itemTabs);

   const handleGetListTargetToday = async () => {
      try {
         showLoading();
         const data: Todo[] = await getListTargetToday();
         setListTargetToday(data);
         const completeTarget = data.filter((item) => item.isDone);
         setTotalCompleteTodayTarget(completeTarget);
         const incomingTarget = data.filter((item) => !item.isDone);
         setTotalIncomingTodayTarget(incomingTarget);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };
   const getListTarget = async () => {
      try {
         showLoading();
         const data: Todo[] = await getListTargetOverview({ type: [] });
         setTotalTarget(data.length);
         const completeTarget = data.filter((item) => item.isDone);
         setTotalCompleteTarget(completeTarget);
         const incomingTarget = data.filter((item) => !item.isDone);
         setTotalIncomingTarget(incomingTarget);
         setTab([
            {
               label: t('Common_Incomming_Target'),
               children: <TargetList data={incomingTarget} />,
               key: 'Incomming Target',
            },

            {
               label: t('Common_Complete_Target'),
               children: <TargetList data={completeTarget} />,
               key: 'Complete Target',
            },
         ]);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      Promise.all([getListTarget(), handleGetListTargetToday()]);
   }, []);

   return (
      <div>
         <Row style={{ marginBottom: 16 }}>
            <Link
               to={RoutePath.targetList}
               style={{
                  color: '#383e58',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
               }}
            >
               <PlusCircleOutlined style={{ paddingRight: 8, fontSize: 14 }} />
               {t('Common_Create_A_New_Target')}
            </Link>
         </Row>
         <Row>
            <Divider orientation="left">
               {t('Common_List_Target_Today')}
            </Divider>
         </Row>
         <Row gutter={16}>
            <Col span={8} sm={8}>
               <Tag
                  color="#bfe9ff"
                  style={{ width: '100%', padding: '32px 64px' }}
               >
                  <Row
                     justify="center"
                     align="middle"
                     style={{ height: 40, fontSize: '1.25rem', gap: 20 }}
                  >
                     <FileTextOutlined style={{ color: 'rgb(59,165, 220)' }} />
                     <div style={{ color: 'black', fontWeight: 600 }}>
                        {listTargetToday.length}
                     </div>
                     <div style={{ color: 'black', fontSize: '0.875rem' }}>
                        {t('Common_Total')}
                     </div>
                  </Row>
               </Tag>
            </Col>
            <Col span={8}>
               <Tag
                  color="#ffe7a7"
                  style={{ width: '100%', padding: '32px 64px' }}
               >
                  <Row
                     justify="center"
                     align="middle"
                     style={{ height: 40, fontSize: '1.25rem', gap: 20 }}
                  >
                     <FileSyncOutlined style={{ color: 'rgb(225, 160, 29)' }} />
                     <div style={{ color: 'black', fontWeight: 600 }}>
                        {totalIncomingTodayTarget.length}
                     </div>
                     <div style={{ color: 'black', fontSize: '0.875rem' }}>
                        {t('Common_Incomming')}
                     </div>
                  </Row>
               </Tag>
            </Col>
            <Col span={8}>
               <Tag
                  color="green"
                  style={{ width: '100%', padding: '32px 64px' }}
               >
                  <Row
                     justify="center"
                     align="middle"
                     style={{ height: 40, fontSize: '1.25rem', gap: 20 }}
                  >
                     <FileProtectOutlined />
                     <div style={{ color: 'black', fontWeight: 600 }}>
                        {totalCompleteTodayTarget.length}
                     </div>

                     <div style={{ color: 'black', fontSize: '0.875rem' }}>
                        {t('Common_Complete')}
                     </div>
                  </Row>
               </Tag>
            </Col>
         </Row>

         <Row>
            <Tag
               icon={<ExclamationCircleOutlined />}
               color="warning"
               className="mt-3"
            >
               {t('Common_Today_Have_Target', {
                  number: totalIncomingTodayTarget.length,
               })}
            </Tag>
         </Row>
         {totalIncomingTodayTarget.length !== 0 && (
            <Row className="mt-3">
               <ListTargetToday data={totalIncomingTodayTarget} />
            </Row>
         )}

         <Row>
            <Divider orientation="left">
               {t('Common_List_Target_Overview')}
            </Divider>
         </Row>

         <Row gutter={16}>
            <Col span={8} sm={8}>
               <Tag
                  color="#bfe9ff"
                  style={{ width: '100%', padding: '32px 64px' }}
               >
                  <Row
                     justify="center"
                     align="middle"
                     style={{ height: 40, fontSize: '1.25rem', gap: 20 }}
                  >
                     <FileTextOutlined style={{ color: 'rgb(59,165, 220)' }} />
                     <div style={{ color: 'black', fontWeight: 600 }}>
                        {totalTarget}
                     </div>
                     <div style={{ color: 'black', fontSize: '0.875rem' }}>
                        {t('Common_Total')}
                     </div>
                  </Row>
               </Tag>
            </Col>
            <Col span={8}>
               <Tag
                  color="#ffe7a7"
                  style={{ width: '100%', padding: '32px 64px' }}
               >
                  <Row
                     justify="center"
                     align="middle"
                     style={{ height: 40, fontSize: '1.25rem', gap: 20 }}
                  >
                     <FileSyncOutlined style={{ color: 'rgb(225, 160, 29)' }} />
                     <div style={{ color: 'black', fontWeight: 600 }}>
                        {totalIncomingTarget.length}
                     </div>
                     <div style={{ color: 'black', fontSize: '0.875rem' }}>
                        {t('Common_Incomming')}
                     </div>
                  </Row>
               </Tag>
            </Col>
            <Col span={8}>
               <Tag
                  color="green"
                  style={{ width: '100%', padding: '32px 64px' }}
               >
                  <Row
                     justify="center"
                     align="middle"
                     style={{ height: 40, fontSize: '1.25rem', gap: 20 }}
                  >
                     <FileProtectOutlined />
                     <div style={{ color: 'black', fontWeight: 600 }}>
                        {totalCompleteTarget.length}
                     </div>

                     <div style={{ color: 'black', fontSize: '0.875rem' }}>
                        {t('Common_Complete')}
                     </div>
                  </Row>
               </Tag>
            </Col>
         </Row>

         <Tabs tabPosition="left" items={tab} className="mt-3" />
      </div>
   );
};

export default TargetOverView;
