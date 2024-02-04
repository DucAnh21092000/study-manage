import { Breadcrumb } from 'antd';
import {
   BreadcrumbItemType,
   BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Breadcrumb.module.scss';

export const BreadcrumbContext = createContext<IContext>({
   items: [],
   setBreadcrumb: () => 1,
});

interface IBreadcrumbProvide {
   children?: React.ReactNode;
}
interface IBreadcrumb {
   path?: string;
   icon?: React.ReactNode;
   text?: React.ReactNode;
   onClick?: VoidFunction;
}
interface IContext {
   setBreadcrumb: (breadcrumbItem: IBreadcrumb[]) => void;
   items: IBreadcrumb[];
}

interface ICustomBreadcrumbProps {
   items: IBreadcrumb[];
}

const BreadcrumbProvide = (props: IBreadcrumbProvide) => {
   const [items, setItems] = useState<IBreadcrumb[]>([]);
   const setBreadcrumb = (item: IBreadcrumb[]) => {
      setItems([...item]);
   };
   return (
      <BreadcrumbContext.Provider value={{ items, setBreadcrumb }}>
         {props.children}
      </BreadcrumbContext.Provider>
   );
};

export default BreadcrumbProvide;

export const CustomBreadCrumb = (props: ICustomBreadcrumbProps) => {
   const navigate = useNavigate();
   const setRenderItems = useCallback(() => {
      return props.items.map((item) => {
         const temp: Partial<BreadcrumbItemType & BreadcrumbSeparatorType> = {};
         if (temp.path) {
            temp.onClick = () => {
               if (!item.path) return;
               navigate(item.path);
            };
         }
         if (item.onClick) {
            temp.onClick = item.onClick;
         }
         // const isCanClick = Boolean(item.onClick || item.path);
         temp.title = (
            <div>
               {item.icon ? <span>{item.icon}</span> : <></>}
               <span>{item.text}</span>
            </div>
         );
         return temp;
      });
   }, [props.items]);
   return (
      <div className={style.breadcrumb}>
         <Breadcrumb items={setRenderItems()}></Breadcrumb>
      </div>
   );
};

export const useBreadcumb = () => useContext(BreadcrumbContext);
