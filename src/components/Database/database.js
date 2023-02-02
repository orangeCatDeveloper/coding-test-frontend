import React, { useEffect, useState } from "react";
import { Space, Table, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/path";
import * as service from "../../services/users-service";

const Database = () => {
  const [users, setUsers] = useState([]);
  const [updateFuse, setUpdateFuse] = useState(false);
  const findUsers = () => service.findAllUsers().then(users => setUsers(users));
  const { confirm } = Modal;

  const showConfirm = record => {
    confirm({
      title: "Delete comfirmation",
      icon: <ExclamationCircleFilled />,
      content: `Do you Want to delete ${record.username} from database?`,
      onOk() {
        service.deleteUser(record._id).then(res => {
          setUpdateFuse(fuse => !fuse);
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  useEffect(() => {
    findUsers();
  }, [updateFuse]);

  const columns = [
    {
      title: "GitHub Username",
      render: (_, record) => (
        <>
          <Space size={15} align="center">
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
    },
    {
      title: "Action",
      render: (_, record) => <a onClick={e => showConfirm(record)}>Delete</a>
    }
  ];
  return (
    <>
      <Table rowKey="_id" dataSource={users} columns={columns} />
    </>
  );
};

export default Database;
