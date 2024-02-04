import useUtil from '@commons/useUtil';
import { ENoteType } from '@structure/pages/note/enum';
import { Todo } from '@structure/pages/target/models/models';
import { Col, Tag, Row, List, Badge, Card, Typography } from 'antd';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface ITargetList {
   data: Todo[];
}

const TargetList = ({ data }: ITargetList) => {
   const { getNoteTypeByValue } = useUtil();
   const { Paragraph } = Typography;
   const { t } = useTranslation();

   return (
      <Col>
         <Tag style={{ width: '100%', padding: '32px 64px' }}>
            <Col>
               <List
                  pagination={{ position: 'bottom', align: 'center' }}
                  dataSource={data}
                  renderItem={(item) => (
                     <List.Item>
                        <List.Item.Meta
                           description={
                              <Badge.Ribbon
                                 text={getNoteTypeByValue(item.targetType)}
                                 color={
                                    item.targetType === ENoteType.Important
                                       ? 'orange'
                                       : item.targetType ===
                                         ENoteType.VeryImportant
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
                                          {dayjs(item.endDate).format(
                                             'DD MMM YYYY'
                                          )}
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
         </Tag>
      </Col>
   );
};

export default TargetList;
