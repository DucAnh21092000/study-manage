import { PlusCircleOutlined } from '@ant-design/icons';
import useUtil from '@commons/useUtil';
import { useLoading } from '@components/loading/Loading';
import { getListNote } from '@structure/apis/note';
import { ENoteType } from '@structure/pages/note/enum';
import RoutePath from '@structure/routes/path';
import { INoteModel } from '@structure/utils';
import { Badge, Card, Col, List, Row, Tag, Typography } from 'antd';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NoteOverView = () => {
   const { getNoteTypeByValue } = useUtil();
   const { showLoading, closeLoading } = useLoading();
   const [listNote, setListNote] = useState<INoteModel[]>([]);
   const { Paragraph } = Typography;
   const { t } = useTranslation();
   const getListTarget = async () => {
      try {
         showLoading();
         const data = await getListNote({ dataSearch: '' });
         setListNote(data);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getListTarget();
   }, []);

   return (
      <div>
         <Row style={{ marginBottom: 16 }}>
            <Link
               to={RoutePath.noteList}
               style={{
                  color: '#383e58',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
               }}
            >
               <PlusCircleOutlined style={{ paddingRight: 8, fontSize: 14 }} />
               {t('Common_Create_A_New_Note')}
            </Link>
         </Row>
         <Row>
            <Col span={24}>
               <Tag color="processing" style={{ width: '100%' }}>
                  <Col>
                     <Row justify="center">List Note Overview</Row>
                     <List
                        pagination={{ position: 'bottom', align: 'center' }}
                        dataSource={listNote}
                        renderItem={(item) => (
                           <List.Item>
                              <List.Item.Meta
                                 description={
                                    <Badge.Ribbon
                                       text={getNoteTypeByValue(
                                          item.noteType ?? ENoteType.Normal
                                       )}
                                       color={
                                          item.noteType === ENoteType.Important
                                             ? 'orange'
                                             : item.noteType ===
                                               ENoteType.VeryImportant
                                             ? '#f50'
                                             : 'hsl(102, 53%, 61%)'
                                       }
                                    >
                                       <Card
                                          title={
                                             <Paragraph
                                                style={{ width: '80%' }}
                                                ellipsis={{
                                                   rows: 2,
                                                   expandable: false,
                                                }}
                                             >
                                                {item.name}
                                             </Paragraph>
                                          }
                                          size="small"
                                       >
                                          <Paragraph
                                             style={{ width: '80%' }}
                                             ellipsis={{
                                                rows: 4,
                                                expandable: false,
                                             }}
                                          >
                                             {item.note}
                                          </Paragraph>
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
         </Row>
      </div>
   );
};

export default NoteOverView;
