/* eslint-disable @typescript-eslint/no-explicit-any */
import useUtil from '@commons/useUtil';
import { useLoading } from '@components/loading/Loading';
import { SubjectState } from '@structure/pages/Student/enum';
import { ITimeLineData } from '@structure/utils';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useFormStep } from './formContext';

const useViewResult = () => {
   const { showLoading, closeLoading } = useLoading();
   const { genUUID } = useUtil();
   const [finalTimeLine, setFinalTimeLine] = useState<any>([]);
   const getSubjectFromOption = (options: string[]) => {
      return options?.map((item) => {
         return {
            Ten_HP: item.split('-')?.[0],
            Ma_HP: item.split('-')?.[1],
            Ma_QL: item.split('-')?.[2],
         };
      });
   };

   const { convertTimeStringToObject } = useUtil();
   const [isEdit, setIsEdit] = useState(false);
   const [currentItem, setCurrentItem] = useState<string>('');

   const [name, setSelectedName] = useState<string>();

   const { selectedOption, timeLineData } = useFormStep();
   const availableSubject = getSubjectFromOption(
      selectedOption?.availabelSelect || []
   );
   const otherSubject = getSubjectFromOption(selectedOption?.otherSelect || []);
   const allOption = [...availableSubject, ...otherSubject];
   const getTimeLineFromOption = async (
      allOption: ITimeLineData[],
      timeLineData: ITimeLineData[]
   ) => {
      const temp: ITimeLineData[] = [];
      allOption.forEach((option) => {
         const check = temp.some(
            (item) =>
               item.Ten_HP === option.Ten_HP &&
               item.Ma_HP === option.Ma_HP &&
               option.Ma_QL === item.Ma_QL
         );
         if (!check) {
            temp.push(
               ...timeLineData.filter(
                  (arr) =>
                     arr.Ten_HP === option.Ten_HP &&
                     arr.Ma_HP === option.Ma_HP &&
                     arr.Ma_QL === option.Ma_QL
               )
            );
         }
      });

      const rs = await hanldeRemoveClassFullSlot(temp);
      return new Promise((resolve) => {
         const a = generateValidSchedules([], rs);
         resolve(a);
      });
   };

   const checkConflictTime = (
      firstValue: ITimeLineData,
      secondValue: ITimeLineData | ITimeLineData[]
   ) => {
      const firsTime = convertTimeStringToObject(firstValue.Thoi_gian || '');
      let result = false;
      Array.isArray(secondValue) &&
         secondValue?.forEach((item) => {
            const secondTime = convertTimeStringToObject(item.Thoi_gian || '');
            if (
               firstValue.Thu !== item.Thu &&
               item.Ma_HP !== firstValue.Ma_HP
            ) {
               result = false;
            } else {
               if (
                  firsTime.start === secondTime.start ||
                  (firsTime.end <= secondTime.start &&
                     firsTime.start < secondTime.start &&
                     secondTime.start < firsTime.end)
               ) {
                  result = true;
               }
            }
            if (
               (firstValue.Ma_HP === item.Ma_HP &&
                  item.Loai_lop === firstValue.Loai_lop) ||
               firstValue.Ma_lop === item.Ma_lop
            ) {
               result = true;
            }
         });
      return result;
   };

   function generateValidSchedules(
      currentSchedule: ITimeLineData[],
      remainingCourses: ITimeLineData[]
   ) {
      const result: ITimeLineData[] = [];
      if (remainingCourses.length === 0) {
         // Nếu không còn môn học nào trong danh sách, trả về thời khóa biểu hiện tại
         return [currentSchedule];
      } else {
         const currentCourse: ITimeLineData = remainingCourses.shift() ?? {};
         const validSchedules = [];
         validSchedules.push(currentCourse);
         // lấy ra danh sách lớp thí nghiệm trùng với môn đầu tiên
         const labClassList = remainingCourses.filter(
            (item) =>
               item.Ma_HP === currentCourse?.Ma_HP && item.Loai_lop === 'TN'
         );
         const createClassWithLabClass =
            labClassList.length !== 0
               ? labClassList.map((arr) => {
                    const check = checkConflictTime(arr, currentCourse);
                    if (!check) {
                       return [{ ...arr }, { ...currentCourse }];
                    } else {
                       return;
                    }
                 })
               : [[{ ...currentCourse }]];
         createClassWithLabClass.map((item, index) => {
            handleCreateSchedule(
               item as ITimeLineData[],
               remainingCourses,
               result,
               index
            );
         });
         setFinalTimeLine(result);
         return result;
      }
   }

   const handleCreateSchedule = (
      currentCourse: ITimeLineData[],
      remaminCourse: ITimeLineData[],
      result: any,
      index: number
   ) => {
      let temp: ITimeLineData[] = currentCourse;
      remaminCourse.forEach((course: ITimeLineData) => {
         const check = checkConflictTime(course, temp);
         if (!check) {
            temp = [...temp, course];
         } else {
            return;
         }
      });
      result.push({
         name: `Table ${index + 1}`,
         data: temp as ITimeLineData,
         id: genUUID(),
      });
      return result;
   };

   const hanldeRemoveClassFullSlot = (currentResult: ITimeLineData[]) => {
      return currentResult.filter(
         (item) =>
            Number(item.SLĐK) < Number(item.SL_Max) &&
            item.Trang_thai === SubjectState.Registration_Modification
      );
   };

   const initData = async () => {
      try {
         showLoading();
         await getTimeLineFromOption(allOption, timeLineData || []);
         closeLoading();
      } catch (e) {
         closeLoading();
      }
   };
   const columns = [
      {
         title: t('Common_Day'),
         dataIndex: 'Thu',
         key: 'Thu',
      },
      {
         title: t('Common_Time'),
         dataIndex: 'Thoi_gian',
         key: 'Thoi_gian',
         render: (record: string) => {
            console.log(record);
            const time = convertTimeStringToObject(record);
            return record && record !== 'NULL'
               ? `${time.start[0]}${time.start[1]}h${time.start[2]}${time.start[3]}p -> ${time.end[0]}${time.end[1]}h${time.end[2]}${time.end[3]}p`
               : 'NULL';
         },
      },
      {
         title: t('Common_Subject'),
         dataIndex: 'Ten_HP',
         key: 'Ten_HP',
      },
      {
         title: t('Common_Subject_ID'),
         dataIndex: 'Ma_HP',
         key: 'Ma_HP',
      },
      {
         title: t('Common_Class_Type'),
         dataIndex: 'Loai_lop',
         key: 'Loai_lop',
      },
      {
         title: t('Common_Class_ID'),
         dataIndex: 'Ma_lop',
         key: 'Ma_lop',
      },
      {
         title: t('Common_Registered_Quantity'),
         dataIndex: 'SLĐK',
         key: 'SLĐK',
      },
      {
         title: t('Common_Max_Registered_Quantity'),
         dataIndex: 'SL_Max',
         key: 'SL_Max',
      },
   ];

   const handleChangeName = (value: string, recordId: string) => {
      const temp = finalTimeLine.map((item: any) => {
         if (item?.id === recordId) {
            return {
               ...item,
               name: value,
            };
         }
         return item;
      });
      setSelectedName(value);
      setFinalTimeLine(temp);
   };

   const handleSetEditTimeLine = (record: any) => {
      setIsEdit(true);
      setSelectedName(record?.name);
      setCurrentItem(record?.id);
   };

   useEffect(() => {
      initData();
   }, [selectedOption]);

   return {
      getSubjectFromOption,
      finalTimeLine,
      columns,
      currentItem,
      setCurrentItem,
      name,
      handleSetEditTimeLine,
      isEdit,
      handleChangeName,
   };
};

export default useViewResult;
