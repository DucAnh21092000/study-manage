import { IOption, ITimeLineData } from '@structure/utils';
import { useCallback, useEffect, useState } from 'react';

interface IUseSelectOption {
   timeLineData: ITimeLineData[];
}
const useSelectOption = ({ timeLineData }: IUseSelectOption) => {
   const [stateOfOption, setStateOfOption] = useState<IOption[]>([]);
   const [allSelectedOption, setAllSelectedOption] = useState<IOption[]>([]);

   const handleGetSubjectOptions = useCallback(() => {
      const temp: IOption[] = [];
      timeLineData?.forEach((arr) => {
         const isExist = temp?.some(
            (item) => item?.key === `${arr?.Ten_HP}-${arr?.Ma_HP}-${arr.Ma_QL}`
         );
         if (!isExist) {
            temp.push({
               label: `${arr?.Ten_HP}-${arr?.Ma_HP}-${arr.Ma_QL}` || '',
               value: `${arr?.Ten_HP}-${arr?.Ma_HP}-${arr.Ma_QL}` || '',
               key: `${arr?.Ten_HP}-${arr?.Ma_HP}-${arr.Ma_QL}` || '',
            });
         }
      });
      setAllSelectedOption(temp);
      setStateOfOption(temp);
      console.log(temp);
   }, [timeLineData]);

   const handleRemoveOptionSelected = (option: string[], option2: string[]) => {
      const temp: IOption[] = [];
      const allOption = [...option, ...option2];
      allSelectedOption?.forEach((arr) => {
         const isExist = allOption?.some(
            (item) => item.trimStart() === arr.label
         );
         if (!isExist) {
            temp.push(arr);
         }
      });
      setStateOfOption(temp);
   };

   const handleSetSelectedOption = (val: IOption[]) => {
      setAllSelectedOption(val);
   };
   useEffect(() => {
      handleGetSubjectOptions();
   }, [handleGetSubjectOptions]);

   return {
      stateOfOption,
      handleRemoveOptionSelected,
      handleSetSelectedOption,
      allSelectedOption,
   };
};
export default useSelectOption;
