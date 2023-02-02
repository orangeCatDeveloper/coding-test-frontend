import React from "react";
import { render, screen } from "@testing-library/react";
import SearchUser from "./SearchUser";

describe("Test the SearchUser component ", () => {
  test("render the searchbar", async () => {
    render(<SearchUser />);
    expect(screen.getByPlaceholderText("Input username")).toBeTruthy();
  });
  test("render the table", async () => {
    render(<SearchUser />);
    const usersTable = await screen.findAllByRole("table");
    expect(usersTable).toBeTruthy();
  });
});
