/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Table } from 'antd';
import useGetDetailSchedule from './hooks/useGetDetailSchedule';
import useUtil from '@commons/useUtil';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { DownloadOutlined } from '@ant-design/icons';

const DetailPlan = () => {
   const { scheduleValue } = useGetDetailSchedule();
   const { convertTimeStringToObject } = useUtil();
   const { t } = useTranslation();
   function createHeaders(keys: any) {
      const result = [];
      for (let i = 0; i < keys.length; i += 1) {
         result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            align: 'center',
            padding: 0,
            width: 150,
         });
      }
      return result;
   }

   const headers = createHeaders([
      'Thu',
      'Thoi_Gian',
      'Ten_Mon_Hoc',
      'Ma_Lop',
      'Ma_Hoc_Phan',
      'Loai_Lop_Hoc',
      'So_Luong_Dang_Ky',
      'So_Luong_Dang_Ky_Toi_Da',
   ]);

   function removeVietnameseTones(str: any) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
      str = str.replace(/Đ/g, 'D');
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g, ' ');
      str = str.trim();
      // Remove punctuations
      // Bỏ dấu câu, kí tự đặc biệt
      str = str.replace(
         /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
         ' '
      );
      return str?.toString();
   }

   const handleDownloadSchedule = (data: any) => {
      const finalData = data.map((item: any) => {
         return {
            Thu: String(item?.day),
            Thoi_Gian: item?.time,
            Ten_Mon_Hoc: removeVietnameseTones(item?.subject),
            Ma_Lop: String(item?.classNo),
            Ma_Hoc_Phan: String(item.subjectId),
            Loai_Lop_Hoc: item.classType,
            So_Luong_Dang_Ky: String(item?.registered),
            So_Luong_Dang_Ky_Toi_Da: String(item?.maxRegistered),
         };
      });

      const doc = new jsPDF({
         orientation: 'landscape',
      });

      doc.table(1, 1, finalData, headers as any, { autoSize: true });
      doc.save('Thời khóa biểu');
   };
   const columns = [
      {
         title: t('Common_Day'),
         dataIndex: 'day',
         key: 'day',
      },
      {
         title: t('Common_Time'),
         dataIndex: 'time',
         key: 'time',
         render: (record: string) => {
            const time = convertTimeStringToObject(record);
            if (time) {
               return `${time.start[0]}${time.start[1]}h${time.start[2]}${time.start[3]}p -> ${time.end[0]}${time.end[1]}h${time.end[2]}${time.end[3]}p`;
            }
         },
      },
      {
         title: t('Common_Subject'),
         dataIndex: 'subject',
         key: 'subject',
      },
      {
         title: t('Common_Subject_ID'),
         dataIndex: 'subjectId',
         key: 'subjectId',
      },
      {
         title: t('Common_Class_Type'),
         dataIndex: 'classType',
         key: 'classType',
      },
      {
         title: t('Common_Class_ID'),
         dataIndex: 'classNo',
         key: 'classNo',
      },
      {
         title: t('Common_Registered_Quantity'),
         dataIndex: 'registered',
         key: 'registered',
      },
      {
         title: t('Common_Max_Registered_Quantity'),
         dataIndex: 'maxRegistered',
         key: 'maxRegistered',
      },
   ];
   return (
      <div style={{ padding: '0 16px' }}>
         <Col>
            <Row justify="center">
               <Col>
                  <div style={{ fontSize: 20 }}> {scheduleValue?.name}</div>
                  <div style={{ fontSize: 16, fontStyle: 'italic' }}>
                     {scheduleValue?.note}
                  </div>
               </Col>
            </Row>
            <Row>
               {scheduleValue?.result?.map((item) => (
                  <Col sm={24} lg={24}>
                     <Row
                        style={{
                           marginTop: 20,
                           marginBottom: 20,
                           fontWeight: 700,
                        }}
                     >
                        {item.name}
                     </Row>
                     <Row style={{ margin: '20px 0' }}>
                        Tổng số tín chỉ: {item.totalCollageCredit}
                     </Row>
                     <Row
                        style={{ margin: '20px 0' }}
                        onClick={() => handleDownloadSchedule(item.dataModel)}
                     >
                        <DownloadOutlined
                           style={{
                              marginRight: 8,
                              color: 'rgb(22, 119, 255)',
                           }}
                        />
                        <span
                           className="text-primmary"
                           style={{ color: '#1677ff', cursor: 'pointer' }}
                        >
                           Tải về thời khóa biểu này
                        </span>
                     </Row>
                     <Row>
                        <Link
                           style={{ marginBottom: 20 }}
                           to={`/register/${item.id}`}
                        >
                           Đăng ký với thời khóa biểu này
                        </Link>
                     </Row>
                     <Row>
                        <Table
                           columns={columns}
                           dataSource={item.dataModel}
                           pagination={false}
                           style={{ width: '100%' }}
                        />
                     </Row>
                  </Col>
               ))}
            </Row>
         </Col>
      </div>
   );
};

export default DetailPlan;
