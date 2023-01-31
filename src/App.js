import "./App.css";
import SearchUser from "./components/searchUser";
import Database from "./components/database";
import UserDetails from "./components/userDetails";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  DatabaseOutlined
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const routePath = {
  Database: "/database",
  SearchUser: "/search-user",
  UserDetail: "/user-detail"
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  getItem("Search User", routePath.SearchUser, <SearchOutlined />),
  getItem("Database", routePath.Database, <DatabaseOutlined />)
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(routePath.SearchUser);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  useEffect(() => {
    if (
      location.pathname === routePath.SearchUser ||
      location.pathname === "/"
    ) {
      setSelectedItem(routePath.SearchUser);
    } else if (location.pathname === routePath.Database) {
      setSelectedItem(routePath.Database);
    } else {
      setSelectedItem("");
    }
  }, [location.pathname]);

  const onClick = e => {
    setSelectedItem(e.key);
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          onClick={onClick}
          selectedKeys={[selectedItem]}
          theme="dark"
          mode="inline"
          items={items}
          style={{ marginTop: 8 }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, paddingLeft: 30, background: colorBgContainer }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Routes>
            <Route path={routePath.SearchUser} element={<SearchUser />} />
            <Route path={routePath.Database} element={<Database />} />
            <Route
              path={`${routePath.UserDetail}/:id`}
              element={<UserDetails />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(App);
