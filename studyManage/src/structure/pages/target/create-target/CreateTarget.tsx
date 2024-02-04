import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import { useLoading } from '@components/loading/Loading';
import { getListNoteType } from '@structure/apis/note';
import { createTarget } from '@structure/apis/target';
import { ITargetFormModel, ITargetModel } from '@structure/utils';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from '../list-note/ListTarget.module.scss';
import { Todo } from '../models/models';
import SingleTodo from './TodoList';
import RoutePath from '@structure/routes/path';
import { useNavigate } from 'react-router-dom';

interface ICreateTarget {
   shouldUpdated: (val: boolean) => void;
   currentTarget: ITargetModel;
}
const CreateTarget = ({ shouldUpdated, currentTarget }: ICreateTarget) => {
   const { t } = useTranslation();
   const [form] = useForm();
   const { showLoading, closeLoading } = useLoading();
   const { target, startDate, endDate, targetType } = useWatch([], form) ?? {};
   const [todos, setTodos] = useState<Array<Todo>>([]);
   const [itemEdit, setItemEdit] = useState<ITargetFormModel>({});
   const [isEditItem, setIsEditItem] = useState<boolean>(false);
   const [noteTypeOption, setNoteTypeOption] = useState<DefaultOptionType[]>(
      []
   );
   const navigate = useNavigate();
   const { setBreadcrumb } = useBreadcumb();

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');
      setBreadcrumb([
         {
            text: userData.profileName,
         },
         {
            text: t('Common_Create_Target'),
         },
      ]);
   }, []);

   const [isAdd, setIsAdd] = useState<boolean>(true);

   useEffect(() => {
      if (isEditItem) {
         const result = { ...itemEdit };
         result.target = result.todo;
         result.endDate = dayjs(itemEdit.endDate);
         result.startDate = dayjs(itemEdit.startDate);
         form.setFieldsValue(result);

         setIsEditItem(false);
      }
   }, [isEditItem]);

   useEffect(() => {
      if (currentTarget) {
         currentTarget.startDate = dayjs(currentTarget.startDate);
         currentTarget.endDate = dayjs(currentTarget.endDate);
         setTodos((currentTarget.target as Todo[]) ?? []);

         form.setFieldsValue(currentTarget);
      }
   }, [currentTarget]);

   const getListNoteTypeOptions = async () => {
      try {
         showLoading();
         const data = await getListNoteType();
         setNoteTypeOption(data);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getListNoteTypeOptions();
   }, []);

   const formRules = {
      name: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
      date: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
      note: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
      targetOptions: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
         () => ({
            validator() {
               return todos.length > 0 ? Promise.resolve() : Promise.reject();
            },
         }),
      ],
      target: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
      targetType: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
   };
   const handleFinish = async (val: ITargetModel) => {
      const result = {
         ...val,
         target: todos,
         id: currentTarget.id,
      };
      try {
         showLoading();
         await createTarget(result);
         shouldUpdated(true);
         setTodos([]);
         form.resetFields();
         closeLoading();
      } catch (e) {
         closeLoading();
      }
   };

   const handleAddTarget = async () => {
      try {
         setIsAdd(true);
         await form.validateFields(['target']);
         setTodos([
            ...todos,
            {
               id: Date.now(),
               todo: target,
               isDone: false,
               startDate,
               endDate,
               targetType,
            },
         ]);
         form.resetFields(['target', 'targetType']);
      } catch (e) {
         return;
      }
   };

   return (
      <div>
         <div
            style={{
               padding: '0 16px',
               height: 'calc(100vh - 120px)',
               overflow: 'auto',
            }}
         >
            <Row>
               <h2 style={{ paddingTop: 16 }}>
                  <Row>{t('Common_Create_A_New_Target')}</Row>
               </h2>
            </Row>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
               <Form.Item
                  label={t('Common_Name')}
                  name="name"
                  required
                  rules={formRules.name}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label={t('Common_Note')}
                  name="note"
                  rules={formRules.note}
               >
                  <TextArea rows={4} />
               </Form.Item>
               <Form.Item
                  label={t('Common_Target')}
                  required
                  rootClassName={style.targetItem}
                  name="targetOptions"
                  rules={formRules.targetOptions}
               >
                  <Row>
                     <Col
                        style={{
                           border: '1px solid #ccc',
                           margin: 8,
                           padding: '16px 0',
                        }}
                     >
                        <Row style={{ padding: '16px 8px' }} gutter={24}>
                           <Col sm={24}>
                              <Form.Item
                                 name="target"
                                 required
                                 rules={isAdd ? formRules.target : []}
                              >
                                 <Input />
                              </Form.Item>
                           </Col>
                           <Col sm={12}>
                              <Form.Item
                                 label={t('Common_Start_Date')}
                                 name="startDate"
                                 required
                                 rules={formRules.date}
                              >
                                 <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD MMM YYYY"
                                 />
                              </Form.Item>
                           </Col>
                           <Col sm={12}>
                              <Form.Item
                                 label={t('Common_End_Date')}
                                 name="endDate"
                                 required
                                 rules={formRules.date}
                              >
                                 <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD MMM YYYY"
                                 />
                              </Form.Item>
                           </Col>
                           <Row
                              gutter={24}
                              style={{ width: '100%', padding: '16px' }}
                           >
                              <Col sm={20}>
                                 <Form.Item
                                    name="targetType"
                                    label={t('Common_Target_Type')}
                                    required
                                    rules={isAdd ? formRules.targetType : []}
                                 >
                                    <Select
                                       options={noteTypeOption}
                                       placeholder={t('Common_Select_Option')}
                                    />
                                 </Form.Item>
                              </Col>
                              <Col>
                                 <Form.Item label="&nbsp;">
                                    <Button onClick={() => handleAddTarget()}>
                                       {t('Common_Add')}
                                    </Button>
                                 </Form.Item>
                              </Col>
                           </Row>
                        </Row>
                        <div
                           className="todos__heading"
                           style={{ marginLeft: 16 }}
                        >
                           {t('Common_List_Target')}
                        </div>
                        <Row style={{ padding: '16px 8px' }}>
                           {todos?.map((todo, index) => (
                              <SingleTodo
                                 index={index}
                                 todos={todos}
                                 todo={todo}
                                 key={todo.id}
                                 setTodos={setTodos}
                                 setItemEdit={setItemEdit}
                                 setIsEditItem={setIsEditItem}
                              />
                           ))}
                        </Row>
                     </Col>
                  </Row>
               </Form.Item>
            </Form>
         </div>
         <div className={style.listNote__footer}>
            <Button.Group>
               <Button onClick={() => navigate(RoutePath.listPlan)}>
                  {t('Common_Cancel')}
               </Button>
               <Button
                  type="primary"
                  onClick={async () => {
                     try {
                        await form.validateFields([
                           'name',
                           'note',
                           'targetOptions',
                        ]);
                     } catch (e) {
                        console.log(e);
                     }
                     setIsAdd(false);

                     form.submit();
                     setIsAdd(true);
                  }}
               >
                  {t('Common_Submit')}
               </Button>
            </Button.Group>
         </div>
      </div>
   );
};

export default CreateTarget;
