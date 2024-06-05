/** @format */

import React, { useState } from "react";

import {
 MenuFoldOutlined,
 MenuUnfoldOutlined,
 HomeOutlined,
 CopyOutlined,
 UserOutlined,
 LoginOutlined,
 UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "../resources/layout.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
 const [collapsed, setCollapsed] = useState(false);
 const {
  token: { colorBgContainer, borderRadiusLG },
 } = theme.useToken();

 return (
  <Layout>
   <Sider trigger={null} collapsible collapsed={collapsed}>
    <div className="demo-logo-vertical">
     <h3>Shop Pos</h3>
    </div>
    <Menu
     theme="dark"
     mode="inline"
     defaultSelectedKeys={window.location.pathname}>
     {/* /**we added window.location.pathname to highlight the current page in the sidebar**/}
     <Menu.Item key="/home" icon={<HomeOutlined />}>
      <Link to="/home">Home</Link>
     </Menu.Item>
     <Menu.Item key="/bills" icon={<CopyOutlined />}>
      <Link to="/bills">Bills</Link>
     </Menu.Item>
     <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
      <Link to="/items">Items</Link>
     </Menu.Item>
     <Menu.Item key="/customers" icon={<UserOutlined />}>
      <Link to="/customers">Customers</Link>
     </Menu.Item>
     <Menu.Item key="/logout" icon={<LoginOutlined />}>
      Logout
     </Menu.Item>
    </Menu>
   </Sider>
   <Layout>
    <Header
     style={{
      padding: 10,
      background: colorBgContainer,
     }}>
     <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
       fontSize: "16px",
       width: 64,
       height: 64,
      }}
     />
    </Header>
    <Content
     className="site-layout-background"
     style={{
      margin: "10px",
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
     }}>
     {props.children}
    </Content>
   </Layout>
  </Layout>
 );
};

export default DefaultLayout;
