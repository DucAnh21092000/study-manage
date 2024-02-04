import { MinusCircleOutlined } from '@ant-design/icons';
import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import { useLoading } from '@components/loading/Loading';
import { getListTargetOverview } from '@structure/apis/overview';
import RoutePath from '@structure/routes/path';
import { ITargetListOverview } from '@structure/utils';
import {
   Calendar as AntCalendar,
   Badge,
   BadgeProps,
   CalendarProps,
   Checkbox,
   Form,
   Row,
   Tag,
} from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Todo } from '../target/models/models';
import style from './Calendar.module.scss';

function Calendar() {
   const { setBreadcrumb } = useBreadcumb();
   const { showLoading, closeLoading } = useLoading();
   const [targetList, setTargetList] = useState<Todo[]>([]);
   const [form] = useForm();
   const { options } = useWatch([], form) ?? {};

   const getListTarget = async (type?: boolean[]) => {
      try {
         showLoading();
         const data = await getListTargetOverview({ type });
         setTargetList(data);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      if (options?.length === 0 || options?.length === 2) {
         form.resetFields(['options']);
         getListTarget([]);
      } else {
         getListTarget(options);
      }
   }, [options?.length]);

   useEffect(() => {
      setBreadcrumb([
         {
            path: '/',
            text: 'Đinh Đức Anh',
         },
         {
            path: RoutePath.calendar,
            text: 'Calendar',
         },
      ]);

      getListTarget([]);
   }, []);

   const getListData = (value: Dayjs) => {
      let listData: ITargetListOverview[] = [];
      const currentDate = value.format('DD MMM YYYY');

      targetList.forEach((item) => {
         const startDate = dayjs(item.startDate).format('DD MMM YYYY');
         const endDate = dayjs(item.endDate).format('DD MMM YYYY');

         if (
            dayjs(startDate).diff(currentDate, 'day') <= 0 &&
            dayjs(endDate).diff(currentDate, 'day') >= 0
         ) {
            listData = [
               ...listData,
               { isDone: item.isDone, content: item.todo },
            ];
         }
      });
      return listData ?? [];
   };

   const getMonthData = (value: Dayjs) => {
      if (value.month() === 8) {
         return 1394;
      }
   };

   const monthCellRender = (value: Dayjs) => {
      const num = getMonthData(value);
      return num ? (
         <div className={style.notesMonth}>
            <section>{num}</section>
            <span>Backlog number</span>
         </div>
      ) : null;
   };

   const dateCellRender = (value: Dayjs) => {
      const listData = getListData(value);
      return (
         <ul className={style.events}>
            {listData.map((item) => (
               <li key={item.content}>
                  <Badge
                     status={
                        item.isDone
                           ? 'success'
                           : ('warning' as BadgeProps['status'])
                     }
                     text={item.content}
                     title={item.content}
                  />
               </li>
            ))}
         </ul>
      );
   };

   const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
      if (info.type === 'date') return dateCellRender(current);
      if (info.type === 'month') return monthCellRender(current);
      return info.originNode;
   };

   return (
      <div className={style.overViews}>
         <Row>
            <Tag icon={<MinusCircleOutlined />} color="default">
               You can select target state
            </Tag>
         </Row>

         <Form form={form}>
            <Form.Item name="options" initialValue={[false, true]}>
               <Checkbox.Group>
                  <Checkbox value={true}>
                     <Badge color="green" text="Target Complete" />
                  </Checkbox>
                  <Checkbox value={false}>
                     <Badge color="gold" text="Incomming/Doing Target" />
                  </Checkbox>
               </Checkbox.Group>
            </Form.Item>
         </Form>

         <AntCalendar cellRender={cellRender} />
      </div>
   );
}

export default Calendar;
