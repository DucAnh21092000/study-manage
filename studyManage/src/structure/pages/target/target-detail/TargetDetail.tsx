import { EditOutlined } from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import { Button, Col, Divider, Row, Timeline } from 'antd';
import { getTargetById, updateTarget } from '@structure/apis/target';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import style from '../list-note/ListTarget.module.scss';
import { Todo } from '../models/models';
import UpdateTarget from '../update-target/UpdateTarget';
import {
   INoteModel,
   ITargetBodyModel,
   ITargetModel,
   ITimeLine,
} from '@structure/utils';
import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import moment from 'moment';
import TextItem from '@components/textItem/TextItem';
import { useTranslation } from 'react-i18next';

interface ITargetDetail {
   recordId: string;
   handleShowDetail?: (val: boolean) => void;
   handleSetCurrentTarget: (val: ITargetModel) => void;
}
const TargetDetail = ({
   recordId,
   handleShowDetail,
   handleSetCurrentTarget,
}: ITargetDetail) => {
   const [targetList, setTargetList] = useState<Todo[]>([]);
   const [targetDetail, setTargetDetail] = useState<INoteModel>({});
   const { showLoading, closeLoading } = useLoading();
   const [timeline, setListTime] = useState<ITimeLine[]>([]);
   const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
   const [todos, setTodos] = useState<Array<Todo>>([]);
   const [isUpdate, setIsUpdate] = useState<boolean>(false);
   const { t } = useTranslation();
   const { setBreadcrumb } = useBreadcumb();

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');
      setBreadcrumb([
         {
            text: userData.profileName,
         },
         {
            text: t('Common_Target_Detail'),
         },
      ]);
   }, []);

   const handleUpdateTarget = async () => {
      const finalTarget = [
         ...todos.map((item) => {
            return {
               ...item,
               isDone: false,
            };
         }),
         ...CompletedTodos.map((item) => {
            return {
               ...item,
               isDone: true,
               completedDate: item.completedDate ? item.completedDate : dayjs(),
            };
         }),
      ];
      const finalResult = {
         ...targetDetail,
         target: finalTarget,
      };

      try {
         showLoading();
         await updateTarget(finalResult as ITargetBodyModel);
         setIsUpdate(false);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const getTargetDetail = async (id: string) => {
      try {
         showLoading();
         const data = await getTargetById(id);
         const listTarget = data.target;
         const listComplete = listTarget.filter(
            (item: Todo) => item.isDone === true
         );
         const listIncoming = listTarget.filter(
            (item: Todo) => item.isDone !== true
         );

         const arrayStartDate = listTarget.map((item: Todo) =>
            moment(item.startDate)
         );
         const arrayEndDate = listTarget.map((item: Todo) =>
            moment(item.endDate)
         );

         const maxDate = moment.max(arrayEndDate).format('DD-MM-YYYY');
         const minDate = moment.min(arrayStartDate).format('DD-MM-YYYY');

         setCompletedTodos(listComplete);
         const finalTargetList: ITimeLine[] =
            (Array.isArray(listTarget) &&
               listTarget.map((item) => {
                  return {
                     children: (
                        <div style={{ minHeight: item.isDone ? 50 : 30 }}>
                           <b>{item.todo}</b>
                        </div>
                     ),
                     color: item.isDone ? 'green' : 'red',
                     label: (
                        <>
                           {item.isDone ? (
                              <Col>
                                 <Row>
                                    <Col style={{ width: 100 }}>
                                       {t('Common_Start_At')}: &nbsp;
                                    </Col>

                                    {dayjs(item?.startDate)
                                       .format('DD-MM-YYYY')
                                       .toString()}
                                 </Row>
                                 <Row>
                                    <Col style={{ width: 130 }}>
                                       {t('Common_Complete_At')} : &nbsp;
                                    </Col>
                                    {dayjs(item?.completedDate)
                                       .format('DD-MM-YYYY')
                                       .toString()}
                                 </Row>
                              </Col>
                           ) : (
                              <Col>
                                 <Row>
                                    <Col style={{ width: 150 }}>
                                       Expected Time: &nbsp;
                                    </Col>

                                    {dayjs(item?.startDate)
                                       .format('DD-MM-YYYY ')
                                       .toString()}
                                 </Row>
                                 <Row>
                                    <Col style={{ width: 150 }}>
                                       Expected Finish Time: &nbsp;
                                    </Col>
                                    {dayjs(item?.endDate)
                                       .format('DD-MM-YYYY ')
                                       .toString()}
                                 </Row>
                              </Col>
                           )}
                        </>
                     ),
                  };
               })) ||
            [];
         finalTargetList.unshift({
            children: `${t('Common_Start_At')} ${minDate}`,
         });
         finalTargetList.push({
            children: `${t('Common_End_At')} ${maxDate}`,
         });
         setTargetList(listIncoming);
         setListTime(finalTargetList);
         setTargetDetail(data);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getTargetDetail(recordId);
   }, [recordId]);

   const backToCreateNote = () => {
      handleShowDetail?.(false);
   };
   return (
      <div style={{ padding: 16 }}>
         <div>
            <h2>{t('Common_Target_Detail')}</h2>
         </div>
         <Col style={{ padding: '0 16px' }}>
            <Col>
               <TextItem
                  value={targetDetail.name ?? ''}
                  label={t('Common_Name')}
               />
            </Col>
            <Col>
               <TextItem
                  value={targetDetail.note ?? ''}
                  label={t('Common_Note')}
               />
            </Col>
            <Col>
               <TextItem
                  value={
                     dayjs(targetDetail.createdAt).format('DD-MM-YYYY ') ?? ''
                  }
                  label={t('Common_Created_At')}
               />
            </Col>

            <Col>
               <Divider>{t('Common_List_Target')}</Divider>
               <Row style={{ marginBottom: 16 }}>
                  <EditOutlined onClick={() => setIsUpdate(true)} />
                  <Col style={{ marginLeft: 8 }}>
                     Cập nhật trạng thái mục tiêu
                  </Col>
               </Row>
               <Col sm={24}>
                  <Col>
                     {isUpdate && (
                        <UpdateTarget
                           targetList={targetList}
                           setCompletedTodos={setCompletedTodos}
                           setTodos={setTodos}
                           todos={todos}
                           completeTodo={CompletedTodos}
                           setTargetList={setTargetList}
                        />
                     )}
                  </Col>
               </Col>
            </Col>
            {!isUpdate && <Timeline mode="alternate" items={timeline} />}
         </Col>
         <div className={style.listNote__footer}>
            <Button.Group>
               {isUpdate ? (
                  <Button
                     onClick={() => {
                        handleUpdateTarget();
                     }}
                  >
                     {t('Common_Update')}
                  </Button>
               ) : (
                  <Button
                     onClick={() => {
                        handleSetCurrentTarget(targetDetail);
                        handleShowDetail?.(false);
                     }}
                  >
                     {t('Common_Edit')}
                  </Button>
               )}
               <Button type="primary" onClick={() => backToCreateNote()}>
                  {t('Common_Cancel')}
               </Button>
            </Button.Group>
         </div>
      </div>
   );
};
export default TargetDetail;
