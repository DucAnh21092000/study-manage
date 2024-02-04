import { UserOutlined } from '@ant-design/icons';
import { useLoading } from '@components/loading/Loading';
import { login } from '@structure/apis/login';
import RoutePath from '@structure/routes/path';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.scss';

function Login() {
   const [form] = useForm();
   const { showLoading, closeLoading } = useLoading();
   const navigate = useNavigate();
   const onFinish = async (values: any) => {
      try {
         showLoading();
         const data = await login(values);
         console.log(data);
         if (data.login) {
            localStorage.setItem('AuthUser', JSON.stringify(data));
            navigate(RoutePath.overView);
         }
         closeLoading();
      } catch (e) {
         console.log(e);
         closeLoading();
      }
   };
   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <div className={style.login}>
         <div className={style.login__header}>
            <div className={style.login__headerBorder}></div>
            <div className={style.login__headerLayout}></div>
            <div className={style.login__headerBorderBottom}></div>
         </div>
         <div className={style.login__boby}>
            <div className={style.login__bobyLayout}>
               <div className={style.login__content}>
                  <UserOutlined />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     Đăng nhập
                  </div>
               </div>
               <Form
                  form={form}
                  name="basic"
                  style={{ maxWidth: 600 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
               >
                  <Form.Item
                     label="Tài khoản"
                     name="username"
                     rules={[
                        {
                           required: true,
                           message: 'VUi lòng nhập tài khoản!',
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>

                  <Form.Item
                     label="Mật khẩu"
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập mật khẩu!',
                        },
                     ]}
                  >
                     <Input.Password />
                  </Form.Item>

                  <Form.Item>
                     <Button
                        style={{
                           padding: '8px 64px',
                           display: 'flex',
                           alignItems: 'center',
                           background: '#8c1515',
                           color: 'white',
                        }}
                        htmlType="submit"
                     >
                        Đăng nhập
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
}

export default Login;
