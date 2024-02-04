import { EditOutlined } from '@ant-design/icons';
import FoldCard from '@components/foldCard/FoldCard';
import { Checkbox, Col, Form, Input, Row, Table, Tag } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { forwardRef, useImperativeHandle } from 'react';
import style from './ViewResult.module.scss';
import useViewResult from './hook/useViewResult';
import { useFormStep } from './hook/formContext';
import { t } from 'i18next';

const ViewReult = forwardRef((_props, ref) => {
   useImperativeHandle(ref, () => ({ getFieldValue }));
   const [form] = useForm();
   const { selectedResult } = useWatch([], form) ?? {};
   const getFieldValue = () => {
      return selectedResult;
   };

   const {
      finalTimeLine,
      isEdit,
      handleSetEditTimeLine,
      currentItem,
      name,
      handleChangeName,
      columns,
   } = useViewResult();

   const { totalCollageCredit } = useFormStep();

   return (
      <div className={style.viewResult}>
         <Row justify="start">
            <Tag color="warning">{t('Common_Please_Select_One_Schedule')}</Tag>
         </Row>
         <Form form={form}>
            <Form.Item name="selectedResult">
               <Checkbox.Group>
                  <Col>
                     {Array.isArray(finalTimeLine) &&
                        finalTimeLine.map((item, index) => (
                           <Row
                              key={`${index + 1}`}
                              align={'top'}
                              style={{ marginTop: 16 }}
                           >
                              <Checkbox
                                 value={item}
                                 style={{
                                    top: 28,
                                    right: 20,
                                    position: 'relative',
                                 }}
                              ></Checkbox>
                              <FoldCard
                                 title={
                                    <div
                                       style={{
                                          fontSize: 20,
                                          fontWeight: 600,
                                       }}
                                    >
                                       {isEdit && currentItem === item?.id ? (
                                          <Input
                                             value={name}
                                             onChange={(e) =>
                                                handleChangeName(
                                                   e.target.value,
                                                   item.id
                                                )
                                             }
                                          ></Input>
                                       ) : (
                                          <div>
                                             {item.name}
                                             <EditOutlined
                                                onClick={() =>
                                                   handleSetEditTimeLine(item)
                                                }
                                             />
                                          </div>
                                       )}
                                    </div>
                                 }
                              >
                                 <Row justify="start">
                                    Tổng số tín chỉ: {totalCollageCredit}
                                 </Row>
                                 <Table
                                    dataSource={item.data ?? []}
                                    columns={columns}
                                    pagination={false}
                                 />
                              </FoldCard>
                           </Row>
                        ))}
                  </Col>
               </Checkbox.Group>
            </Form.Item>
         </Form>
      </div>
   );
});

ViewReult.displayName = 'View Result';
export default ViewReult;
