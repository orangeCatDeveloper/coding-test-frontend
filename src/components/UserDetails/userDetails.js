import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Space, Divider, Table } from "antd";
import * as repositoriesService from "../../services/repositories-service";
import * as usersService from "../../services/users-service";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState([]);
  const [userInfo, setUserInfo] = useState({
    avatar_url: null,
    username: "N/A"
  });

  const findUserById = () =>
    usersService.findUserById(id).then(user => setUserInfo(user));

  const findAllRepositoriesByUser = () =>
    repositoriesService
      .findAllRepositoriesByUser(id)
      .then(repositories => setRepositories(repositories));

  useEffect(() => {
    findUserById();
    findAllRepositoriesByUser();
  }, []);

  const columns = [
    {
      title: "Repositories",
      dataIndex: "repository_name",
      render: repositoryName => <span>{repositoryName}</span>
    },
    {
      title: "Repositories URL",
      dataIndex: "repository_url",
      render: url => <a href={url}>{url}</a>
    }
  ];

  return (
    <>
      <Button type="primary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Divider />
      <Space style={{ marginBottom: 20 }} direction="horizontal" size={15}>
        <img
          src={userInfo.avatar_url}
          alt="Avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
        <span>{userInfo.username}</span>
      </Space>
      <Table dataSource={repositories} rowKey="_id" columns={columns} />
    </>
  );
};

export default UserDetails;
