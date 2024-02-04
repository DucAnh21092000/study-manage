import { UserOutlined } from '@ant-design/icons';
import logo from '@assets/image/1200px-Logo_Đại_học_Bách_Khoa_Hà_Nội.svg.png';

import {
   CustomBreadCrumb,
   useBreadcumb,
} from '@components/breadcrumb/Breadcrumb';
import RoutePath from '@structure/routes/path';
import { Col, Layout, Menu, Row, Space, Switch, Watermark, theme } from 'antd';
import 'antd/dist/reset.css';
import i18n from 'i18n/i18n';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './DefaultLayout.module.scss';
import { useLoading } from '@components/loading/Loading';
import LazyLoading from '@components/loading/LazyLoading';
import { useTranslation } from 'react-i18next';
const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
   const { isLoading } = useLoading();
   const { t } = useTranslation();
   const userData = JSON.parse(localStorage.getItem('AuthUser') ?? '');
   const {
      token: { colorBgContainer },
   } = theme.useToken();
   const navigate = useNavigate();
   const { items } = useBreadcumb();
   return (
      <Layout rootClassName={style.defaultLayout}>
         <Sider trigger={null} collapsible width={250}>
            <div className={style.header}>
               <Row gutter={[8, 8]} align={'middle'} justify={'center'}>
                  <img src={logo} className={style.logo} />
                  <Col span={16}>
                     <div> TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI</div>
                     {/* <span>Study Manage</span> */}
                  </Col>
               </Row>
            </div>

            <Menu
               theme="dark"
               mode="inline"
               defaultSelectedKeys={['1']}
               items={[
                  {
                     key: '1',
                     label: t('Common_Overview'),
                     onClick: () => navigate(RoutePath.overView),
                  },
                  {
                     key: '2',
                     label: t('Common_Study_Plan'),
                     children: [
                        {
                           key: '2.1',
                           label: t('Common_Create_Schedule'),
                           onClick: () => navigate(RoutePath.createPlan),
                        },
                        {
                           key: '2.2',
                           label: t('Common_List_Schedule'),
                           onClick: () => navigate(RoutePath.listPlan),
                        },
                        {
                           key: '2.3',
                           label: t('Common_Your_Target'),
                           onClick: () => navigate(RoutePath.targetList),
                        },
                     ],
                  },
                  {
                     key: '4',
                     label: t('Common_Your_Note'),
                     onClick: () => navigate(RoutePath.currentSchedule),
                  },
                  {
                     key: '5',
                     label: t('Common_Your_Note'),
                     onClick: () => navigate(RoutePath.noteList),
                  },
                  {
                     key: '6',
                     label: t('Common_Calendar'),
                     onClick: () => navigate(RoutePath.calendar),
                  },
               ]}
               rootClassName={style.navBar}
            />
         </Sider>
         <Layout>
            <Header style={{ background: colorBgContainer }}>
               <CustomBreadCrumb items={items} />
               <Row>
                  <Space className="m-3" direction="vertical">
                     <Switch
                        checkedChildren="Vi"
                        unCheckedChildren="En"
                        defaultChecked
                        onChange={(checked) => {
                           i18n.changeLanguage(checked ? 'vi' : 'en');
                        }}
                     />
                  </Space>
                  <UserOutlined />
               </Row>
            </Header>
            <Watermark content={[userData.profileName, userData.studentId]}>
               <Content
                  style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 240,
                     background: colorBgContainer,
                  }}
               >
                  <Outlet />
                  {isLoading && <LazyLoading />}
               </Content>
            </Watermark>
         </Layout>
      </Layout>
   );
};

export default DefaultLayout;
