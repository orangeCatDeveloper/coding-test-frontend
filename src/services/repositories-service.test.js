import { findAllRepositoriesByUser } from "./repositories-service";
import axios from "axios";

jest.mock("axios");

const data = [
  {
    _id: "63dc1df73db313acb144ac2d",
    repository_name: "Angular-Testing",
    repository_url: "https://github.com/JCjiechen/Angular-Testing",
    owned_by: "63dc1df73db313acb144ac2a"
  },
  {
    _id: "63dc1df73db313acb144ac2e",
    repository_name: "E-Shop",
    repository_url: "https://github.com/JCjiechen/E-Shop",
    owned_by: "63dc1df73db313acb144ac2a"
  },
  {
    _id: "63dc1df73db313acb144ac2f",
    repository_name: "Online-Chat-Room",
    repository_url: "https://github.com/JCjiechen/Online-Chat-Room",
    owned_by: "63dc1df73db313acb144ac2a"
  }
];

describe("Test find all repositories for a user", () => {
  test("Can retrieve all repositories with REST API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
    const repositories = await findAllRepositoriesByUser(
      "63dc1df73db313acb144ac2a"
    );
    expect(repositories).toEqual(data);
  });

  test("Fetch erroneous data", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    const repositories = await findAllRepositoriesByUser(
      "63dc1df73d00000000000000"
    );
    expect(repositories.message).toEqual(errorMessage);
  });
});
