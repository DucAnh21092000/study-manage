import {
   CheckOutlined,
   CloseOutlined,
   DeleteOutlined,
} from '@ant-design/icons';
import { ENoteType } from '@structure/pages/note/enum';
import { Badge, Card, Col, Empty, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../models/models';
import { useTranslation } from 'react-i18next';

interface IUpdateTarget {
   targetList: Todo[];
   setCompletedTodos: Dispatch<SetStateAction<Todo[]>>;
   setTodos: Dispatch<SetStateAction<Todo[]>>;
   todos: Todo[];
   completeTodo: Todo[];
   setTargetList: Dispatch<SetStateAction<Todo[]>>;
}

const UpdateTarget = ({
   targetList,
   setCompletedTodos,
   setTodos,
   todos,
   completeTodo,
   setTargetList,
}: IUpdateTarget) => {
   const { Paragraph } = Typography;
   const { t } = useTranslation();

   const getNoteTypeByValue = (value: ENoteType) => {
      if (value === ENoteType.Important) return 'Important';
      if (value === ENoteType.VeryImportant) return 'Very Important';
      else return 'Normal';
   };

   const handleAddCompleteTarget = (val: Todo) => {
      setCompletedTodos([...completeTodo, val]);
      const newTargetList = targetList.filter((item) => item.id !== val.id);
      setTodos(newTargetList);
      setTargetList(newTargetList);
   };

   const handleRemoveCompleteTarget = (val: Todo) => {
      const newCompleteTarget = completeTodo.filter(
         (item) => item.id !== val.id
      );

      setCompletedTodos(newCompleteTarget);
      setTodos([...todos, val]);
      setTargetList([...targetList, val]);
   };

   const handleDeleteTarget = (val: Todo, type: string) => {
      if (type === 'incoming') {
         const temp = todos.filter((item) => item.id !== val.id);
         setTodos(temp);
      } else {
         const temp = completeTodo.filter((item) => item.id !== val.id);
         setCompletedTodos(temp);
      }
   };
   return (
      <div style={{ marginBottom: 64 }}>
         <div className="todos__heading">Incoming Tasks</div>
         {targetList?.map((todo: Todo) => {
            return (
               <div key={todo.id} style={{ margin: '16px 0' }}>
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
                                 {dayjs(todo.startDate).format('DD MMM YYYY')}
                              </Col>
                              <Col>
                                 {t('Common_End_At')}: &nbsp;
                                 {dayjs(todo.endDate).format('DD MMM YYYY')}
                              </Col>
                           </Col>
                           <div
                              style={{
                                 gap: 10,
                                 display: 'flex',
                                 cursor: 'pointer',
                              }}
                           >
                              <span
                                 onClick={() => {
                                    handleAddCompleteTarget(todo);
                                 }}
                              >
                                 <CheckOutlined />
                              </span>
                              <span
                                 onClick={() =>
                                    handleDeleteTarget(todo, 'incoming')
                                 }
                              >
                                 <DeleteOutlined />
                              </span>
                           </div>
                        </Row>
                     </Card>
                  </Badge.Ribbon>
               </div>
            );
         })}
         {targetList.length === 0 && (
            <Empty description="There is no incoming target to display." />
         )}
         <div className="todos__heading">Complete Task</div>
         <Col>
            {completeTodo?.map((todo: Todo) => {
               return (
                  <div key={todo.id} style={{ margin: '16px 0' }}>
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
                                    Finish at: &nbsp;
                                    {dayjs(todo.endDate).format('DD MMM YYYY')}
                                 </Col>
                              </Col>
                              <div
                                 style={{
                                    gap: 10,
                                    display: 'flex',
                                    cursor: 'pointer',
                                 }}
                              >
                                 <span
                                    onClick={() => {
                                       handleRemoveCompleteTarget(todo);
                                    }}
                                 >
                                    <CloseOutlined />
                                 </span>
                                 <span
                                    onClick={() =>
                                       handleDeleteTarget(todo, 'complete')
                                    }
                                 >
                                    <DeleteOutlined />
                                 </span>
                              </div>
                           </Row>
                        </Card>
                     </Badge.Ribbon>
                  </div>
               );
            })}
         </Col>
         <Col>
            {completeTodo?.length === 0 && (
               <Empty description="There are no complete target to display." />
            )}
         </Col>
      </div>
   );
};
export default UpdateTarget;
