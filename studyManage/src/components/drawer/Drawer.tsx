import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Form } from 'antd';
import { forwardRef, useState, useImperativeHandle } from 'react';

interface IPanel {
   children: React.ReactNode;
   title?: string;
   loadFilterData: (val: any) => void;
}

const Panel = forwardRef(
   ({ children, title = 'Filter', loadFilterData }: IPanel, ref) => {
      const [open, setOpen] = useState(false);
      const [form] = Form.useForm();

      const showDrawer = () => {
         setOpen(true);
      };

      const onClose = () => {
         setOpen(false);
      };
      useImperativeHandle(ref, () => ({
         showDrawer,
      }));

      const onFinish = (val: any) => {
         loadFilterData(val);
         console.log(val);
         onClose();
      };

      const onRenderFooter = () => {
         return (
            <>
               <Button onClick={onClose}> Cancel</Button>
               <Button onClick={() => form.resetFields()}> Reset</Button>
               <Button type="primary" onClick={() => form.submit()}>
                  Submit
               </Button>
            </>
         );
      };
      return (
         <div>
            <Drawer
               title={title}
               placement="right"
               onClose={onClose}
               open={open}
               destroyOnClose={true}
               maskClosable={false}
               closable={false}
               extra={<CloseOutlined onClick={onClose} />}
               footer={onRenderFooter()}
            >
               <Form form={form} onFinish={onFinish} layout="vertical">
                  {children}
               </Form>
            </Drawer>
         </div>
      );
   }
);
Panel.displayName = 'Panel';
export default Panel;
