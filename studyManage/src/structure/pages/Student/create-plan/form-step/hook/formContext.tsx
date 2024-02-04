import { IFormOption, ITimeLineData } from '@structure/utils';
import { createContext, useContext, useState } from 'react';

interface IFormStepContext {
   timeLineData?: ITimeLineData[];
   header?: string[];
   title?: string;
   setTimeLine?: (data: Array<object>) => void;
   setHeader?: (data: string[]) => void;
   setTitle?: (data: string) => void;
   selectedOption: IFormOption;
   setAllSelectedOption?: (data: IFormOption) => void;
   selectedResult: ITimeLineData[];
   setUserSelectResult?: (data: ITimeLineData[]) => void;
   totalCollageCredit?: number;
   setTotalCollageCredit?: (val: number) => void;
}

export const FormStepContext = createContext<IFormStepContext>({
   timeLineData: [],
   header: [],
   title: '',
   selectedOption: {},
   selectedResult: [],
   totalCollageCredit: 0,
});

interface IFormStepProvider {
   children: React.ReactNode;
}

export const FormStepProvider = ({ children }: IFormStepProvider) => {
   const [timeLineData, setTimeLineData] = useState<ITimeLineData[]>([]);
   const [title, setTitleValue] = useState<string>('');
   const [header, setHeaderValue] = useState<string[]>([]);
   const [totalCollageCredit, setTotalCredit] = useState<number>(0);
   const [selectedOption, setOptionSelectedValue] = useState<IFormOption>({});
   const [selectedResult, setSelectedResult] = useState<ITimeLineData[]>([]);
   const setTimeLine = (data: ITimeLineData[]) => {
      setTimeLineData(data);
   };

   const setTitle = (data: string) => {
      setTitleValue(data);
   };

   const setTotalCollageCredit = (value: number) => {
      setTotalCredit(value);
   };

   const setHeader = (data: string[]) => {
      setHeaderValue(data);
   };
   const setAllSelectedOption = (data: IFormOption) => {
      setOptionSelectedValue(data);
   };
   const setUserSelectResult = (data: ITimeLineData[]) => {
      setSelectedResult(data);
   };
   return (
      <FormStepContext.Provider
         value={{
            setTimeLine,
            timeLineData,
            setHeader,
            header,
            setTitle,
            title,
            selectedOption,
            setAllSelectedOption,
            selectedResult,
            setUserSelectResult,
            setTotalCollageCredit,
            totalCollageCredit,
         }}
      >
         {children}
      </FormStepContext.Provider>
   );
};

export const useFormStep = () => useContext(FormStepContext);
