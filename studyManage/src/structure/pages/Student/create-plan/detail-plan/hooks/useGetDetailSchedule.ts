import { useLoading } from '@components/loading/Loading';
import { getScheduleById } from '@structure/apis/student';
import { ITimeLineDataResponseModel } from '@structure/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useGetDetailSchedule = () => {
   const [scheduleValue, setScheduleValue] =
      useState<ITimeLineDataResponseModel>({});
   const { id } = useParams();
   const { showLoading, closeLoading } = useLoading();
   const initData = async () => {
      try {
         showLoading();
         const { data } = await getScheduleById(id ?? '');
         setScheduleValue(data);
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };
   useEffect(() => {
      initData();
   }, []);
   return { scheduleValue };
};

export default useGetDetailSchedule;
