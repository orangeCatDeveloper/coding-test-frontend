import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
describe("My test", () => {
  test("renders menu search user item", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const linkElement = screen.getByText(/Search User/i);
    expect(linkElement).toBeInTheDocument();
  });
});
