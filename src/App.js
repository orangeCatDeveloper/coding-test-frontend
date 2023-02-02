import "./App.css";
import SearchUser from "./components/SearchUser/searchUser";
import Database from "./components/Database/database";
import UserDetails from "./components/UserDetails/userDetails";
import { ROUTE_PATHS } from "./constants/path";
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
  getItem("Search User", ROUTE_PATHS.SEARCH_USER, <SearchOutlined />),
  getItem("Database", ROUTE_PATHS.DATABASE, <DatabaseOutlined />)
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(ROUTE_PATHS.SEARCH_USER);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  useEffect(() => {
    if (
      location.pathname === ROUTE_PATHS.SEARCH_USER ||
      location.pathname === "/"
    ) {
      setSelectedItem(ROUTE_PATHS.SEARCH_USER);
    } else if (location.pathname === ROUTE_PATHS.DATABASE) {
      setSelectedItem(ROUTE_PATHS.DATABASE);
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
            <Route path="/" element={<SearchUser />} />
            <Route path={ROUTE_PATHS.SEARCH_USER} element={<SearchUser />} />
            <Route path={ROUTE_PATHS.DATABASE} element={<Database />} />
            <Route
              path={`${ROUTE_PATHS.USER_DETAIL}/:id`}
              element={<UserDetails />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
