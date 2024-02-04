import { createSchedule } from '@structure/apis/student';
import {
   ISelectOptionRef,
   ITimeLineBaseDataCollection,
   ITimeLineData,
   IViewResultRef,
} from '@structure/utils';
import { Button, Col, Input, Modal, Steps, message, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileUpload from './FileUpload';
import SelectOption from './SelectOption';
import ViewReult from './ViewResult';
import { useLoading } from '@components/loading/Loading';
import { EStatus } from '../../enum';
import { useFormStep } from './hook/formContext';
import { useNavigate } from 'react-router-dom';
import RoutePath from '@structure/routes/path';
import Select, { DefaultOptionType } from 'antd/es/select';
import { getListSemester } from '@structure/apis/semester';

const FormStep: React.FC = () => {
   const { t } = useTranslation();
   const selectOptionRef = useRef<ISelectOptionRef>(null);
   const { token } = theme.useToken();
   const [current, setCurrent] = useState(0);
   const viewResultRef = useRef<IViewResultRef>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [name, setName] = useState<string>('');
   const [note, setNote] = useState<string>('');
   const [selectedSemester, setSelectedSemester] = useState<number>(0);
   const { showLoading, closeLoading } = useLoading();
   const [semesterOptions, setSemesterOptions] = useState<DefaultOptionType[]>(
      []
   );
   const navigate = useNavigate();
   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      handleSubmit(name);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   const steps = [
      {
         title: t('Common_Upload_File'),
         content: <FileUpload />,
      },
      {
         title: t('Common_Select_Option'),
         content: <SelectOption ref={selectOptionRef} />,
      },
      {
         title: t('Common_View_Result'),
         content: <ViewReult ref={viewResultRef} />,
      },
   ];

   const next = async () => {
      let isValid = true;

      if (current === 1) {
         isValid = await selectOptionRef.current?.handleValidateForm();
      }

      if (isValid) {
         setCurrent(current + 1);
      }
   };

   const prev = () => {
      setCurrent(current - 1);
   };

   const { totalCollageCredit } = useFormStep();

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

   const handleSubmit = async (name: string) => {
      const value = viewResultRef.current?.getFieldValue();
      const result =
         (Array.isArray(value) &&
            value.map((item) => {
               return {
                  tableName: item.name,
                  data: item.data.map((value: ITimeLineData) => {
                     return {
                        subject: value.Ten_HP,
                        classNo: value.Ma_lop,
                        registered: Number(value.SLĐK),
                        maxRegistered: Number(value?.SL_Max),
                        classType: value.Loai_lop,
                        time: value.Thoi_gian,
                        day: Number(value.Thu),
                        subjectId: value.Ma_HP,
                        totalCollageCredit,
                     };
                  }),
               };
            })) ||
         [];
      try {
         showLoading();
         const finalData: ITimeLineBaseDataCollection = {};
         finalData.result = result;
         finalData.name = name;
         finalData.semester = selectedSemester;
         finalData.note = note;
         finalData.status = EStatus.active;
         const { status } = await createSchedule(finalData);
         if (status === 200) {
            await message.success('Create Success!');
         } else {
            await message.error('Create Failed!');
         }
         navigate(RoutePath.listPlan);
         handleCancel();
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const items = steps.map((item) => ({ key: item.title, title: item.title }));

   const contentStyle: React.CSSProperties = {
      minHeight: 'calc(100vh - 272px)',
      textAlign: 'center',
      color: token.colorTextTertiary,
      backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
      padding: '16px 24px',
   };

   return (
      <div style={{ padding: '32px 64px' }}>
         <Steps current={current} items={items} />
         <div style={contentStyle}>{steps[current].content} &nbsp;</div>
         <div style={{ marginTop: 24 }}>
            {current > 0 && (
               <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  {t('Common_Previous')}
               </Button>
            )}
            {current < steps.length - 1 && (
               <Button type="primary" onClick={() => next()}>
                  {t('Common_Next')}
               </Button>
            )}
            {current === steps.length - 1 && (
               <Button type="primary" onClick={() => showModal()}>
                  {t('Common_Submit')}
               </Button>
            )}
         </div>
         <Modal
            title={t('Common_Create_Schedule')}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <Col>
               <div>{t('Common_Name')}</div>
               <Input required onChange={(e) => setName(e.target.value)} />
            </Col>
            <Col>
               <div>{t('Common_Note')}</div>
               <Input required onChange={(e) => setNote(e.target.value)} />
            </Col>
            <Col>
               <div>{t('Common_Semester')}</div>
               <Select
                  options={semesterOptions}
                  placeholder={t('Common_Select_Option')}
                  onChange={(value) => setSelectedSemester(value)}
               />
            </Col>
         </Modal>
      </div>
   );
};

export default FormStep;
