import React from "react";
import { render, screen } from "@testing-library/react";
import Database from "./Database";

describe("Test the Database component ", () => {
  test("render the table", async () => {
    render(<Database />);
    const usersTable = await screen.findAllByRole("table");
    expect(usersTable).toBeTruthy();
  });
});
