import React from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ENoteType } from '@structure/pages/note/enum';
import { Badge, Card, Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { Todo } from '../models/models';
import style from './TodoList.module.scss';
import { useTranslation } from 'react-i18next';

interface ISingleTodo {
   index: number;
   todo: Todo;
   todos: Array<Todo>;
   setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   setItemEdit: any;
   setIsEditItem: React.Dispatch<React.SetStateAction<boolean>>;
}
const SingleTodo = ({
   todo,
   todos,
   setTodos,
   setItemEdit,
   setIsEditItem,
}: ISingleTodo) => {
   const { Paragraph } = Typography;
   const { t } = useTranslation();

   const handleEdit = (todo: Todo) => {
      const newTodo = todos.filter((item) => item.id !== todo.id);
      setItemEdit(todo);
      setIsEditItem(true);
      setTodos(newTodo);
   };

   const getNoteTypeByValue = (value: ENoteType) => {
      if (value === ENoteType.Important) return 'Important';
      if (value === ENoteType.VeryImportant) return 'Very Important';
      else return 'Normal';
   };

   const handleDelete = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
   };

   return (
      <div className={style.todoList}>
         <div>
            <form
               className={`todos__single ${style.todoList__item} `}
               style={{ minWidth: '720px' }}
            >
               {todo.isDone ? (
                  <span
                     className={style.todoSingleText}
                     style={{ width: 1000 }}
                  >
                     <Badge.Ribbon
                        text={getNoteTypeByValue(todo.targetType)}
                        color={
                           todo.targetType === ENoteType.Important
                              ? 'orange'
                              : todo.targetType === ENoteType.VeryImportant
                              ? '#f50'
                              : 'hsl(102, 53%, 61%)'
                        }
                     >
                        <Card
                           title={
                              <Paragraph
                                 style={{ width: '80%' }}
                                 ellipsis={{ rows: 2, expandable: false }}
                              >
                                 {todo.todo}
                              </Paragraph>
                           }
                           size="small"
                        >
                           <Row justify="space-between">
                              <Col>
                                 <Col>
                                    {t('Common_Start_At')}: &nbsp;
                                    {dayjs(todo.startDate).format(
                                       'DD MMM YYYY'
                                    )}
                                 </Col>
                                 <Col>
                                    {t('Common_End_At')}: &nbsp;
                                    {dayjs(todo.endDate).format('DD MMM YYYY')}
                                 </Col>
                              </Col>
                              <div>
                                 <span
                                    className={style.icon}
                                    onClick={() => {
                                       if (!todo.isDone) {
                                          handleEdit(todo);
                                       }
                                    }}
                                 >
                                    <EditOutlined />
                                 </span>
                                 <span
                                    className={style.icon}
                                    onClick={() => handleDelete(todo?.id ?? 1)}
                                 >
                                    <DeleteOutlined />
                                 </span>
                              </div>
                           </Row>
                        </Card>
                     </Badge.Ribbon>
                  </span>
               ) : (
                  <span className={style.todoSingleText}>
                     <Badge.Ribbon
                        text={getNoteTypeByValue(todo.targetType)}
                        color={
                           todo.targetType === ENoteType.Important
                              ? 'orange'
                              : todo.targetType === ENoteType.VeryImportant
                              ? '#f50'
                              : 'hsl(102, 53%, 61%)'
                        }
                     >
                        <Card
                           title={
                              <Paragraph
                                 style={{ width: '80%' }}
                                 ellipsis={{ rows: 2, expandable: false }}
                              >
                                 {todo.todo}
                              </Paragraph>
                           }
                           size="small"
                        >
                           <Row justify="space-between">
                              <Col>
                                 <Col>
                                    {t('Common_Start_At')}: &nbsp;
                                    {dayjs(todo.startDate).format(
                                       'DD MMM YYYY'
                                    )}
                                 </Col>
                                 <Col>
                                    {t('Common_End_At')}: &nbsp;
                                    {dayjs(todo.endDate).format('DD MMM YYYY')}
                                 </Col>
                              </Col>
                              <div>
                                 <span
                                    className={style.icon}
                                    onClick={() => {
                                       if (!todo.isDone) {
                                          handleEdit(todo);
                                       }
                                    }}
                                 >
                                    <EditOutlined />
                                 </span>
                                 <span
                                    className={style.icon}
                                    onClick={() => handleDelete(todo?.id ?? 1)}
                                 >
                                    <DeleteOutlined />
                                 </span>
                              </div>
                           </Row>
                        </Card>
                     </Badge.Ribbon>
                  </span>
               )}
            </form>
         </div>
      </div>
   );
};

export default SingleTodo;
