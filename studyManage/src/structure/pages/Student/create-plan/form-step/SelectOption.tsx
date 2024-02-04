import { IFormOption } from '@structure/utils';
import { Form, Select } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormStep } from './hook/formContext';
import useSelectOption from './hook/selectOption';
import validateForm from './hook/validateForm';

const SelectOption = forwardRef((_, ref) => {
   const [form] = useForm();
   const { t } = useTranslation();
   const { handleValidateForm } = validateForm({ form });

   const onSubmit = () => {
      form.submit();
      return handleValidateForm();
   };
   useImperativeHandle(ref, () => ({
      handleValidateForm,
      onSubmit,
   }));
   const {
      timeLineData,
      setAllSelectedOption,
      selectedOption,
      setTotalCollageCredit,
   } = useFormStep();
   const { handleRemoveOptionSelected, stateOfOption } = useSelectOption({
      timeLineData: timeLineData || [],
   });

   const { availabelSelect } = useWatch([], form) ?? {};

   const handleGetTotalSubject = () => {
      let temp = 0;
      Array.isArray(availabelSelect) &&
         availabelSelect?.map((item: string) => {
            const selectedSubject = timeLineData?.find(
               (subject) =>
                  `${subject.Ten_HP}-${subject.Ma_HP}-${subject.Ma_QL}` === item
            );
            temp += Number(selectedSubject?.Khoi_luong?.split('')[0]);
         });
      setTotalCollageCredit?.(temp);
      return temp;
   };

   useEffect(() => {
      handleGetTotalSubject();
   }, [availabelSelect]);

   const rule = {
      specialize: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
      options: [
         {
            required: true,
            message: t('Common_This_Is_Require'),
         },
      ],
   };

   const onFinish = (val: IFormOption) => {
      setAllSelectedOption?.(val);
   };

   return (
      <>
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedOption}
         >
            <Form.Item
               label={t('Student_Subject')}
               name="availabelSelect"
               required
               rules={rule.specialize}
            >
               <Select
                  showSearch
                  mode="multiple"
                  placeholder={t('Common_Dropdown_Placeholder')}
                  style={{ width: '100%' }}
                  options={stateOfOption}
                  onChange={(value: string[]) =>
                     handleRemoveOptionSelected(
                        value,
                        form.getFieldValue('otherSelect') || []
                     )
                  }
               />
            </Form.Item>
         </Form>
         <div>Tổng số tín chỉ : {handleGetTotalSubject()}</div>
      </>
   );
});

SelectOption.displayName = 'Select Option';

export default SelectOption;
