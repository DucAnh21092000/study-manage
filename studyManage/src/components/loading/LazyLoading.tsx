import { Spin } from 'antd';
import style from './LazyLoading.module.scss';

const LazyLoading = () => {
   return (
      <div className={style.loadingWrapper}>
         <Spin size="large">
            <div className="content" />
         </Spin>
      </div>
   );
};

export default LazyLoading;
