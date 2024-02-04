import { ScheduleOutlined } from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import { getListNote } from '@structure/apis/note';
import { INoteModel } from '@structure/utils';
import { Col, Empty, Row } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import CreateNote from '../create-note/CreateNote';
import NoteDetail from '../note-detail/NoteDetail';
import style from './ListNote.module.scss';

const ListNote = () => {
   const { showLoading, closeLoading } = useLoading();
   const [noteList, setNoteList] = useState<INoteModel[]>([]);
   const [isShowDetail, setShowDetail] = useState<boolean>(false);
   const [recordId, setRecordId] = useState<string>('');
   const [isUpdated, setIsUpdated] = useState<boolean>(false);

   const getNoteList = async () => {
      try {
         showLoading();
         const data = await getListNote({ dataSearch: '' });
         setNoteList(data);
         setIsUpdated(false);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getNoteList();
   }, [isUpdated]);

   const onSearch: SearchProps['onSearch'] = async (value, _e) => {
      try {
         showLoading();
         const data = await getListNote({ dataSearch: value });
         setNoteList(data);
         setIsUpdated(false);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const handleShowNoteDetail = (id: string) => {
      setRecordId(id);
      setShowDetail(true);
   };

   const shouldUpdated = (val: boolean) => {
      setIsUpdated(val);
   };
   const hanldeSetShowDetail = (val: boolean) => {
      setShowDetail(val);
   };
   return (
      <div className={style.listNote}>
         <Row>
            <Col span={6}>
               <div className={style.listNote__left}>
                  <div className={style.listNote__header}>
                     <Search
                        placeholder="Search by note or name"
                        onSearch={onSearch}
                        style={{ width: 250 }}
                     />
                  </div>
                  <div>
                     {noteList?.map((item, index) => (
                        <Row
                           key={`${item.createdAt}${index + 1}`}
                           className={style.noteItems}
                           onClick={() => handleShowNoteDetail(item.id ?? '')}
                        >
                           <Row
                              align="middle"
                              className={style.noteItem}
                              justify="space-between"
                           >
                              <div style={{ display: 'flex', width: '60%' }}>
                                 <ScheduleOutlined style={{ marginRight: 8 }} />
                                 <Col sm={24}>
                                    <Row>
                                       <div className={style.textOverflow}>
                                          {item.name}
                                       </div>
                                    </Row>
                                    <Row justify="space-between">
                                       <div className={style.noteItem__note}>
                                          {item.note}
                                       </div>
                                    </Row>
                                 </Col>
                              </div>
                              <Col>
                                 <div>
                                    {dayjs(item.createdAt).format(
                                       'DD MMM YYYY'
                                    )}
                                 </div>
                              </Col>
                           </Row>
                        </Row>
                     ))}
                     {noteList.length === 0 && (
                        <Empty description="There is no record to display." />
                     )}
                  </div>
               </div>
            </Col>
            <Col
               span={18}
               style={{
                  backgroundColor: '#f5f5f5',
                  height: 'calc(100vh - 64px)',
               }}
            >
               {isShowDetail ? (
                  <NoteDetail
                     recordId={recordId}
                     handleShowDetail={hanldeSetShowDetail}
                     shouldUpdated={shouldUpdated}
                     isUpdate={isUpdated}
                  />
               ) : (
                  <CreateNote shouldUpdated={shouldUpdated} />
               )}
            </Col>
         </Row>
      </div>
   );
};

export default ListNote;
