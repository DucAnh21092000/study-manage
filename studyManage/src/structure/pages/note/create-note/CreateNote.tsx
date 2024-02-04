import { UploadOutlined } from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import { createNote, getListNoteType } from '@structure/apis/note';
import { multipleFilesUpload } from '@structure/apis/upload';
import { Button, Form, Input, Row, Select, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadFile } from 'antd/es/upload';

import { INoteBodyModel } from '@structure/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from '../list-note/ListNote.module.scss';
import { DefaultOptionType } from 'antd/es/select';
import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import RoutePath from '@structure/routes/path';

interface ICreateNote {
   shouldUpdated: (val: boolean) => void;
}
const CreateNote = ({ shouldUpdated }: ICreateNote) => {
   const { t } = useTranslation();
   const [form] = useForm();
   const { showLoading, closeLoading } = useLoading();
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const [noteTypeOption, setNoteTypeOption] = useState<DefaultOptionType[]>(
      []
   );
   const { setBreadcrumb } = useBreadcumb();
   useEffect(() => {
      setBreadcrumb([
         {
            path: '/',
            text: 'Đinh Đức Anh',
         },
         {
            path: RoutePath.noteList,
            text: 'Create a Note',
         },
      ]);
   }, []);

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
   };
   const handleFinish = async (val: INoteBodyModel) => {
      try {
         showLoading();
         const { data } = await createNote(val);
         const formData = new FormData();
         Array.from(fileList).forEach((file) => {
            formData.append('files', file as unknown as Blob, file.fileName);
         });
         formData.append('recordId', data.id);
         await multipleFilesUpload(formData);
         shouldUpdated(true);
         form.resetFields();
         closeLoading();
      } catch (e) {
         closeLoading();
      }
   };
   const beforeUpload = (file: RcFile) => {
      setFileList((preState) => [...preState, file]);
      return false;
   };

   return (
      <div>
         <div style={{ padding: '0 16px' }}>
            <Row>
               <h2 style={{ paddingTop: 16 }}>
                  <Row>Create a Note</Row>
               </h2>
            </Row>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
               <Form.Item
                  label="Name"
                  name="name"
                  required
                  rules={formRules.name}
               >
                  <Input />
               </Form.Item>
               <Form.Item label="Note" name="note" rules={formRules.note}>
                  <TextArea rows={4} />
               </Form.Item>
               <Form.Item
                  label="Note Type"
                  name="noteType"
                  required
                  rules={formRules.date}
               >
                  <Select
                     options={noteTypeOption}
                     placeholder={t('Common_Select_Option')}
                  />
               </Form.Item>
               <Form.Item label="Upload file" name="files">
                  <Upload beforeUpload={beforeUpload} multiple>
                     <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
               </Form.Item>
            </Form>
            <div className={style.listNote__footer}>
               <Button.Group>
                  <Button type="primary" onClick={() => form.submit()}>
                     Submit
                  </Button>
               </Button.Group>
            </div>
         </div>
      </div>
   );
};

export default CreateNote;
