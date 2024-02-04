import { useLoading } from '@components/loading/Loading';
import RoutePath from '@structure/routes/path';
import { InputRef, UploadFile, UploadProps, message } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { RcFile } from 'antd/es/upload';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';
import { useFormStep } from './formContext';

const InitData = () => {
   const { setTitle, title, header, setHeader, timeLineData, setTimeLine } =
      useFormStep();
   const [hasData, setHasData] = useState<boolean>(false);
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef<InputRef>(null);
   const { showLoading, closeLoading } = useLoading();
   const [open, setOpen] = useState(timeLineData?.length === 0 ? true : false);
   const navigate = useNavigate();

   const handleOk = () => {
      handleChangeFile(fileList[0]);
      setOpen(false);
   };

   const handleCancel = () => {
      navigate(RoutePath.listPlan);
      setOpen(false);
   };
   const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: string
   ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };

   const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
   };
   function createArrayOfArrayObjects(keys: string[], values: string[][]) {
      const result: Array<Array<{ [key: string]: string }>> = [];

      for (let i = 0; i < values.length; i++) {
         const innerArray: Array<{ [key: string]: string }> = [];

         for (let j = 0; j < values[i].length; j++) {
            const obj: { [key: string]: string } = {};
            obj[keys[j].normalize('NFD').replace(/[\u0300-\u036f]/g, '')] =
               values[i][j];
            innerArray.push(obj);
         }
         result.push(innerArray);
      }

      const rs = result.slice(3);
      convertData(rs);
   }

   const convertData = (data: Array<Array<{ [key: string]: string }>>) => {
      const rs = data.map((item) => {
         return Object.assign({}, ...item.flat().slice(0, item.length));
      });

      setHasData(true);
      setTimeLine?.(rs || []);
   };

   const handleChangeFile = async (file: any) => {
      showLoading();
      const reader = new FileReader();

      if (file) {
         const blob = new Blob([file], { type: file?.type });
         reader.readAsBinaryString(blob);
         reader.onload = (e) => {
            const data = e.target?.result;
            const rs = read(data, { type: 'binary' });
            const sheetName = rs.SheetNames[0];
            const sheet = rs.Sheets[sheetName];
            const fileData = utils.sheet_to_json(sheet, { header: 1 });
            const title =
               (Array.isArray(fileData[0]) &&
                  fileData?.[0]?.map((arr: string) => arr)?.join('')) ||
               '';
            setTitle?.(title || '');
            createArrayOfArrayObjects(
               fileData[2] as string[],
               fileData as string[][]
            );
            setHeader?.(fileData[2] as string[]);
            closeLoading();
         };
      }
   };

   const props: UploadProps = {
      onChange(info) {
         if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
         }
         if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
         } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
         }
      },
   };
   const beforeUpload = (file: RcFile) => {
      setFileList([...fileList, file]);
      return false;
   };
   return {
      beforeUpload,
      props,
      title,
      header,
      handleCancel,
      handleOk,
      handleChangeFile,
      handleReset,
      handleSearch,
      timeLineData,
      open,
      searchInput,
      searchText,
      searchedColumn,
      setSearchedColumn,
      setSearchText,
      fileList,
      hasData,
   };
};

export default InitData;
