import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test the UserDetails component ", () => {
  test("render go back button", async () => {
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    const backButton = await screen.getByText(/Back/i);
    expect(backButton).toBeTruthy();
  });
  test("render the table", async () => {
    render(
      <Router>
        <UserDetails />
      </Router>
    );
    const usersTable = await screen.findAllByRole("table");
    expect(usersTable).toBeTruthy();
  });
});
