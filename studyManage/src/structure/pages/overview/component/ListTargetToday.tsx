import useUtil from '@commons/useUtil';
import { ENoteType } from '@structure/pages/note/enum';
import { Todo } from '@structure/pages/target/models/models';
import { Badge, Card, Col, List, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface IListTargetToday {
   data: Todo[];
}

const ListTargetToday = ({ data }: IListTargetToday) => {
   const { getNoteTypeByValue } = useUtil();
   const { Paragraph } = Typography;
   const { t } = useTranslation();

   return (
      <Col
         sm={24}
         id="scrollableDiv"
         style={{
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
         }}
      >
         <List
            dataSource={data}
            renderItem={(item) => (
               <List.Item key={item.id}>
                  <List.Item.Meta
                     description={
                        <Badge.Ribbon
                           text={getNoteTypeByValue(item.targetType)}
                           color={
                              item.targetType === ENoteType.Important
                                 ? 'orange'
                                 : item.targetType === ENoteType.VeryImportant
                                 ? '#f50'
                                 : 'hsl(102, 53%, 61%)'
                           }
                        >
                           <Card
                              style={{ backgroundColor: '#ffffff' }}
                              title={
                                 <Paragraph
                                    style={{
                                       width: '80%',
                                       whiteSpace: 'nowrap',
                                    }}
                                    ellipsis={{
                                       rows: 2,
                                       expandable: false,
                                    }}
                                 >
                                    {item.todo}
                                 </Paragraph>
                              }
                              size="small"
                           >
                              <Col>
                                 <Row>
                                    {t('Common_Start_At')}:
                                    {dayjs(item.startDate).format(
                                       'DD MMM YYYY'
                                    )}
                                 </Row>
                                 <Row>
                                    {t('Common_End_At')}:
                                    {dayjs(item.endDate).format('DD MMM YYYY')}
                                 </Row>
                              </Col>
                           </Card>
                        </Badge.Ribbon>
                     }
                  />
               </List.Item>
            )}
         />
      </Col>
   );
};
export default ListTargetToday;
