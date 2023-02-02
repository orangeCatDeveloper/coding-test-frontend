import React, { useState } from "react";
import { Input, Space, Table, Spin, notification } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/path";
import * as service from "../../services/users-service";
const { Search } = Input;

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = description => {
    api.info({
      message: `Search Failed`,
      description,
      placement: "bottom"
    });
  };

  const onSearch = value => {
    if (value !== "") {
      setUsers([]);
      setIsSearching(true);
      service.searchUserByUsername(value).then(res => {
        setIsSearching(false);
        if (res.length > 0) {
          setUsers(res);
        } else {
          openNotification("The user you are searching for does not exist.");
        }
      });
    } else {
      openNotification("Username can not be empty!");
    }
  };

  const columns = [
    {
      title: "GitHub Username",
      render: (_, record) => (
        <>
          <Space size={15} align="center" id={record.username}>
            <img
              src={record.avatar_url}
              alt="Avatar"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <Link to={`${ROUTE_PATHS.USER_DETAIL}/${record._id}`}>
              {record.username}
            </Link>
          </Space>
        </>
      )
    },
    {
      title: "GitHub URL",
      dataIndex: "github_url",
      render: url => <a href={url}>{url}</a>
    }
  ];
  return (
    <>
      <Search
        placeholder="input username"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      {!isSearching ? (
        <Table
          style={{ marginTop: 50 }}
          rowKey="_id"
          dataSource={users}
          columns={columns}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <Spin tip="Loading" size="large" />
        </div>
      )}
      {contextHolder}
    </>
  );
};

export default SearchUser;
