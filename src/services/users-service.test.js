import {
  findAllUsers,
  findUserById,
  searchUserByUsername,
  deleteUser
} from "./users-service";
import axios from "axios";

//use mock data for axios request
jest.mock("axios");

describe("Test find all users", () => {
  test("Can find all users with REST API", async () => {
    const data = [
      {
        _id: "63d2360ebf9edffde8ffdef1",
        username: "orangeCatDeveloper",
        github_url: "https://github.com/orangeCatDeveloper",
        avatar_url: "https://avatars.githubusercontent.com/u/95899648?v=4"
      },
      {
        _id: "63d85fa00442a00d87e8cdc4",
        username: "vbuterin",
        github_url: "https://github.com/vbuterin",
        avatar_url: "https://avatars.githubusercontent.com/u/2230894?v=4"
      }
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
    const users = await findAllUsers();
    expect(users).toEqual(data);
  });
});

describe("Test find User By ID", () => {
  test("Can find user by ID with REST API", async () => {
    const data = {
      _id: "63d85fa00442a00d87e8cdc4",
      username: "vbuterin",
      github_url: "https://github.com/vbuterin",
      avatar_url: "https://avatars.githubusercontent.com/u/2230894?v=4"
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
    const user = await findUserById("63d85fa00442a00d87e8cdc4");
    expect(user).toEqual(data);
  });
});

describe("Test search user by username", () => {
  test("Can search user by username with REST API", async () => {
    const data = {
      _id: "63d85fa00442a00d87e8cdc4",
      username: "vbuterin",
      github_url: "https://github.com/vbuterin",
      avatar_url: "https://avatars.githubusercontent.com/u/2230894?v=4"
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
    const user = await searchUserByUsername();
    expect(user).toEqual([data]);
  });
});

describe("Test delete user", () => {
  test("Can delete user with REST API", async () => {
    const data = {
      acknowledged: true,
      deletedCount: 1
    };
    axios.delete.mockImplementationOnce(() => Promise.resolve({ data }));
    const res = await deleteUser();
    expect(res).toEqual(data);
  });
});
