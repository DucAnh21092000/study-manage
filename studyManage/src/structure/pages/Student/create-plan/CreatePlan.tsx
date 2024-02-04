import { useBreadcumb } from '@components/breadcrumb/Breadcrumb';
import style from './CreatePlan.module.scss';
import FormStep from './form-step/FormStep';
import { FormStepProvider } from './form-step/hook/formContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CreatePlan = () => {
   const { setBreadcrumb } = useBreadcumb();
   const { t } = useTranslation();
   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');
      setBreadcrumb([
         {
            text: userData.profileName,
         },
         {
            text: t('Common_Create_Schedule'),
         },
      ]);
   }, []);
   return (
      <div className={style.createPlan}>
         <FormStepProvider>
            <FormStep />
         </FormStepProvider>
      </div>
   );
};
export default CreatePlan;
