import { DownloadOutlined, FileImageOutlined } from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import { deleteNoteById, getNoteById } from '@structure/apis/note';
import { getMultipleFiles } from '@structure/apis/upload';
import { url } from '@structure/pages/Student/enum';
import { IFileModel, INoteModel } from '@structure/utils';
import {
   Button,
   Col,
   Divider,
   Empty,
   Image,
   Modal,
   Row,
   Tag,
   message,
} from 'antd';

import useUtil from '@commons/useUtil';
import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import TextItem from '@components/textItem/TextItem';
import RoutePath from '@structure/routes/path';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { ENoteType } from '../enum';
import style from '../list-note/ListNote.module.scss';
import { useTranslation } from 'react-i18next';
interface INoteDetail {
   recordId: string;
   handleShowDetail?: (val: boolean) => void;
   shouldUpdated: (val: boolean) => void;
   isUpdate: boolean;
}
const NoteDetail = ({
   recordId,
   handleShowDetail,
   shouldUpdated,
   isUpdate,
}: INoteDetail) => {
   const [noteDetail, setNoteDetail] = useState<INoteModel>({});
   const [selectedImage, setSelectedImage] = useState<string>('');
   const { showLoading, closeLoading } = useLoading();
   const [visible, setVisible] = useState(false);
   const [files, setFiles] = useState<IFileModel[]>([]);
   const { setBreadcrumb } = useBreadcumb();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { getNoteTypeByValue } = useUtil();
   const { t } = useTranslation();
   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = async () => {
      try {
         showLoading();
         await deleteNoteById(noteDetail.id ?? '');
         await message.success('Delete Note ' + noteDetail.name + 'success!');
         setIsModalOpen(false);
         shouldUpdated(true);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };
   const getNoteDetail = async (id: string) => {
      try {
         showLoading();
         const data = await getNoteById(id);
         const filesResponse = await getMultipleFiles(data.id);
         setFiles(filesResponse.files);
         setNoteDetail(data);
         shouldUpdated(false);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };

   useEffect(() => {
      getNoteDetail(recordId);
      setBreadcrumb([
         {
            path: '/',
            text: 'Đinh Đức Anh',
         },
         {
            path: RoutePath.noteList,
            text: t('Common_Note_Detail'),
         },
      ]);
   }, [recordId, isUpdate]);

   const backToCreateNote = () => {
      handleShowDetail?.(false);
   };
   return (
      <div style={{ padding: '24px 16px' }}>
         <div className="mb-4">
            <h2>{t('Common_Note_Detail')}</h2>
         </div>
         <Col>
            <TextItem value={noteDetail.name ?? ''} label={t('Common_Name')} />
         </Col>
         <Col>
            <TextItem value={noteDetail.note ?? ''} label={t('Common_Note')} />
            <TextItem
               value={dayjs(noteDetail.createdAt).format('DD-MM-YYYY ') ?? ''}
               label={t('Common_Created_At')}
            />
         </Col>
         <Col>
            <TextItem
               value={
                  <Tag
                     color={
                        noteDetail.noteType === ENoteType.Important
                           ? 'orange'
                           : noteDetail.noteType === ENoteType.VeryImportant
                           ? '#f50'
                           : 'hsl(102, 53%, 61%)'
                     }
                  >
                     {getNoteTypeByValue(
                        noteDetail.noteType ?? ENoteType.Normal
                     )}
                  </Tag>
               }
               label={t('Common_Note_Type')}
            />
            <div></div>
         </Col>
         <Col>
            <Divider orientation="left">Files</Divider>
            <Col sm={12} style={{ marginTop: 8 }}>
               {files?.map((arr) => (
                  <Row
                     key={arr.filePath}
                     justify="space-between"
                     style={{
                        border: '1px solid #ccc',
                        padding: '8px 16px',
                        marginBottom: 8,
                        borderRadius: 7,
                     }}
                  >
                     <Row>
                        <FileImageOutlined />
                        <div
                           style={{ marginLeft: 10 }}
                           onClick={() => {
                              setSelectedImage(`${url}${arr.filePath}`);
                              setVisible(true);
                           }}
                        >
                           {arr.fileName}
                        </div>
                     </Row>
                     <div>
                        <DownloadOutlined
                           onClick={() => {
                              saveAs(`${url}${arr.filePath}`, arr.fileName);
                           }}
                        />
                     </div>
                  </Row>
               ))}
               {files.length === 0 && (
                  <Empty
                     description={t(
                        'Common_There_Are_No_Image_To_Show_In_This_View'
                     )}
                  />
               )}
            </Col>
         </Col>
         <Image
            width={200}
            style={{ display: 'none' }}
            src={selectedImage}
            preview={{
               visible,
               src: selectedImage,
               onVisibleChange: (value) => {
                  setVisible(value);
               },
            }}
         />

         <div className={style.listNote__footer}>
            <Button.Group>
               <Button onClick={() => showModal()}>{t('Common_Delete')}</Button>
               <Button type="primary" onClick={() => backToCreateNote()}>
                  {t('Common_Cancel')}
               </Button>
            </Button.Group>
         </div>
         <Modal
            title="Delete Note"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
         >
            <p>
               Are you want to delete note: <b>{noteDetail.name}</b>
            </p>
         </Modal>
      </div>
   );
};
export default NoteDetail;
