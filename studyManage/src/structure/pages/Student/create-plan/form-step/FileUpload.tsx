/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table, Upload } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { IFilterDropDown } from '../CreatePaln.module';
import style from '../CreatePlan.module.scss';
import InitData from './hook/FileUpload';

const FileUpload = () => {
   const { t } = useTranslation();
   const {
      beforeUpload,
      props,
      title,
      header,
      handleCancel,
      handleOk,
      handleReset,
      handleSearch,
      timeLineData,
      open,
      searchInput,
      searchText,
      searchedColumn,
      setSearchText,
      setSearchedColumn,
      fileList,
   } = InitData();

   const getColumnSearchProps = (dataIndex: string) => ({
      filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters,
         close,
      }: IFilterDropDown) => (
         <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
               ref={searchInput}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
               }
               onPressEnter={() =>
                  handleSearch(selectedKeys as string[], confirm, dataIndex)
               }
               style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() =>
                     handleSearch(selectedKeys as string[], confirm, dataIndex)
                  }
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => clearFilters && handleReset(clearFilters)}
                  size="small"
                  style={{ width: 90 }}
               >
                  Reset
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     confirm({ closeDropdown: false });
                     setSearchText((selectedKeys as string[])[0]);
                     setSearchedColumn(dataIndex);
                  }}
               >
                  Filter
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     close();
                  }}
               >
                  close
               </Button>
            </Space>
         </div>
      ),
      filterIcon: (filtered: boolean) => (
         <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value: string, record: any) =>
         record[dataIndex]
            ?.toString()
            ?.toLowerCase()
            ?.includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible: boolean) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text: string) => {
         return searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ''}
            />
         ) : (
            text
         );
      },
   });

   const columns =
      (Array.isArray(header) &&
         header?.map((arr) => {
            return {
               title: arr,
               dataIndex: arr.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
               key: arr,
               ...getColumnSearchProps(
                  arr.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
               ),
            };
         })) ||
      [];

   const onRenderFooter = () => {
      return (
         <ButtonGroup>
            <Button onClick={handleCancel}>{t('Common_Cancel')}</Button>
            <Button
               type="primary"
               onClick={handleOk}
               disabled={fileList.length === 0 ? true : false}
            >
               {t('Common_OK')}
            </Button>
         </ButtonGroup>
      );
   };

   return (
      <>
         <Modal
            title={t('Common_Upload_File')}
            open={open}
            width={390}
            centered={true}
            onCancel={handleCancel}
            maskClosable={false}
            footer={onRenderFooter}
         >
            <Upload {...props} beforeUpload={beforeUpload}>
               <Button icon={<UploadOutlined />}>
                  {t('Common_Click_To_Upload')}
               </Button>
            </Upload>
         </Modal>

         {!open && (
            <>
               <div className="text-center mt-3 mb-3">{title}</div>
               <Table
                  dataSource={timeLineData}
                  columns={columns as any}
                  scroll={{ x: 4000 }}
                  sticky={{ offsetHeader: -90 }}
                  rootClassName={style.rootTable}
               />
            </>
         )}
      </>
   );
};
export default FileUpload;
