import { CloseOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import { getListSemester } from '@structure/apis/semester';
import { updateScheduleById } from '@structure/apis/student';
import { IListNoteFilter, ITimeLineDataResponseModel } from '@structure/utils';
import {
   Button,
   Col,
   DatePicker,
   Drawer,
   Form,
   Input,
   Modal,
   Row,
   Space,
   Table,
   message,
} from 'antd';
import Select, { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EStatus } from '../../enum';
import useGetListPlan from './hooks/useGetListPlan';
import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'antd/es/form/Form';
import debounce from 'lodash/debounce';

interface ILIstPlanTable {
   type: EStatus | string;
}
const ListPlanTable = ({ type }: ILIstPlanTable) => {
   const { t } = useTranslation();
   const { listPlan, getListPlan } = useGetListPlan({ type: type ?? '' });
   const { showLoading, closeLoading } = useLoading();
   const [messageApi] = message.useMessage();
   const [semesterOptions, setSemesterOptions] = useState<DefaultOptionType[]>(
      []
   );
   const [inputSearch, setInputSearch] = useState<string>('');
   const [form] = useForm();
   const [open, setOpen] = useState(false);
   const { RangePicker } = DatePicker;
   const showDrawer = () => {
      setOpen(true);
   };
   const { semester } = useWatch([], form) ?? {};
   const onClose = () => {
      setOpen(false);
   };

   const handleDeleteSchedule = async (id: string, name: string) => {
      try {
         showLoading();
         const { data } = await updateScheduleById({
            scheduleId: id,
            status: EStatus.draf,
         });
         if (data.result) {
            messageApi.success(`Delete, ${name} success!`);
         } else {
            messageApi.error(`Delete, ${name} error!`);
         }
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const columns = [
      {
         dataIndex: 'name',
         key: 'name',
         title: t('Common_Name'),
         render: (_: string, record: ITimeLineDataResponseModel) => {
            return (
               <Link to={`/student/plan/detail/${record?.scheduleId}`}>
                  {record?.name}
               </Link>
            );
         },
      },
      {
         dataIndex: 'note',
         key: 'note',
         title: t('Common_Note'),
      },
      {
         dataIndex: 'createdDate',
         key: 'createdDate',
         title: t('Common_Created_At'),
         render: (record: string) => dayjs(record).format('DD MMM YYYY hh:mm'),
      },
   ];
   const finalColumns =
      type.toString() === EStatus.active.toString()
         ? [
              ...columns,
              {
                 dataIndex: 'action',
                 key: 'action',
                 title: t('Common_Action'),
                 render: (_: string, record: ITimeLineDataResponseModel) => (
                    <DeleteOutlined
                       onClick={() =>
                          handleDeleteSchedule(
                             record?.scheduleId ?? '',
                             record?.name ?? ''
                          )
                       }
                    />
                 ),
              },
           ]
         : [
              ...columns,
              {
                 dataIndex: 'modifiedDate',
                 key: 'modifiedDate',
                 title: t('Common_Modified_Date'),
                 render: (record: string) =>
                    dayjs(record).format('DD MMM YYYY hh:mm'),
              },
           ];

   const getListSemesterOptions = async () => {
      try {
         showLoading();
         const data = await getListSemester();
         setSemesterOptions(data);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getListSemesterOptions();
   }, []);

   const onRenderFooter = () => {
      return (
         <>
            <Button onClick={onClose}>Cancel </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
            <Button type="primary" onClick={() => form.submit()}>
               Apply
            </Button>
         </>
      );
   };

   const onFinish = async (val: IListNoteFilter) => {
      try {
         showLoading();
         await getListPlan(type, val?.semester, inputSearch);
         onClose();
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const onSearch = async (val: string) => {
      try {
         showLoading();
         await getListPlan(type, semester, val);
         onClose();
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const config = {
      title: 'Thông báo',
      content: (
         <>
            <p>Tính năng này đang phát triển!</p>
            <p>
               Tại đây người dùng có thể upload file thời khóa biểu đã có sẵn và
               đúng định dạng của hệ thống. Sau đó người dùng có thể lưu lại
               thời khóa biểu này!
            </p>
         </>
      ),
   };

   return (
      <>
         <Row justify="start">
            <span
               className="text-primmary"
               style={{ color: '#1677ff', cursor: 'pointer' }}
               onClick={() => {
                  Modal.warning(config);
               }}
            >
               Upload thời có biểu có sẵn
            </span>
         </Row>
         <Row justify="end">
            <Col>
               <Space
                  style={{
                     border: '1px solid #ccc',
                     padding: '4px 8px',
                     borderRadius: 5,
                     marginRight: 8,
                  }}
                  onClick={showDrawer}
               >
                  <MenuOutlined />
               </Space>
            </Col>
            <Col>
               <Input
                  placeholder="Search by Schedule name and note"
                  onChange={debounce((e) => {
                     onSearch(e.target.value);
                     setInputSearch(e.target.value);
                  }, 1000)}
               />
            </Col>
         </Row>
         <Table dataSource={listPlan} columns={finalColumns} />
         <Drawer
            title="Filter"
            destroyOnClose
            placement="right"
            onClose={onClose}
            open={open}
            closable={false}
            extra={<CloseOutlined onClick={onClose} />}
            footer={onRenderFooter()}
         >
            <Form onFinish={onFinish} form={form} layout="vertical">
               <Form.Item label="Semester" name="semester">
                  <Select
                     options={semesterOptions}
                     placeholder={t('Common_Select_Option')}
                  />
               </Form.Item>
               <Form.Item name="dateTime" label="Created Date Time">
                  <RangePicker format="DD-MMM-YYYY" />
               </Form.Item>
            </Form>
         </Drawer>
      </>
   );
};

export default ListPlanTable;
