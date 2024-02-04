import { ENoteType } from '@structure/pages/note/enum';

const useUtil = () => {
   const convertTimeStringToObject = (time: string) => {
      const item = time?.split('-');

      return {
         start: item?.[0],
         end: item?.[1],
      };
   };

   const getNoteTypeByValue = (value: ENoteType) => {
      if (value === ENoteType.Important) return 'Important';
      if (value === ENoteType.VeryImportant) return 'Very Important';
      else return 'Normal';
   };

   function genUUID() {
      return '10000000-1000-4000-8000-100000000000'.replace(
         /[018]/g,
         (c: any) =>
            (
               c ^
               (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
      );
   }

   return {
      convertTimeStringToObject,
      genUUID,
      getNoteTypeByValue,
   };
};
export default useUtil;
