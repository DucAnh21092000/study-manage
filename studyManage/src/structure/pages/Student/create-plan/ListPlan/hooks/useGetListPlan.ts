import { useLoading } from '@components/loading/Loading';
import { getListSchedule } from '@structure/apis/student';
import { EStatus } from '@structure/pages/Student/enum';
import { ITimeLineDataResponseModel } from '@structure/utils';
import { useEffect, useState } from 'react';

interface IUseGetListPlan {
   type: EStatus | string;
}

const useGetListPlan = ({ type }: IUseGetListPlan) => {
   const [listPlan, setListPlan] = useState<ITimeLineDataResponseModel[]>([]);
   const { showLoading, closeLoading } = useLoading();
   const getListPlan = async (
      type: EStatus | string,
      semester?: number,
      dataSearch?: string
   ) => {
      try {
         showLoading();
         const { data } = await getListSchedule({
            status: type,
            semester: semester ?? 1,
            dataSearch,
         });
         setListPlan(data);
         closeLoading();
      } catch (e) {
         closeLoading();
         console.log(e);
      }
   };
   useEffect(() => {
      getListPlan(type);
   }, [type]);

   return {
      listPlan,
      getListPlan,
   };
};
export default useGetListPlan;
