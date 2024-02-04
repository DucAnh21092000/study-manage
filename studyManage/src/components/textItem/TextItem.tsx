import { Row, Col } from 'antd';
import style from './TextItem.module.scss';
import { ReactNode } from 'react';

interface ITextItem {
   value: string | ReactNode;
   label: string;
}

const TextItem = ({ value, label }: ITextItem) => {
   return (
      <Row className={style.textItem}>
         <Col className={style.label}>{label}</Col>
         <Col className={style.value}>{value}</Col>
      </Row>
   );
};
export default TextItem;
