import { FormInstance } from 'antd';

interface IValidateForm {
   form?: FormInstance<string>;
}

const validateForm = ({ form }: IValidateForm) => {
   const getSubjectFromOption = (options: string[]) => {
      return options.map((item) => {
         return item.split('-').join('');
      });
   };

   const handleValidateForm = async () => {
      try {
         await form?.validateFields();
         await form?.submit();
         return true;
      } catch (e) {
         return false;
      }
   };

   return { handleValidateForm, getSubjectFromOption };
};
export default validateForm;
