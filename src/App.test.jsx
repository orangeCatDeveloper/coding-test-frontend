import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

test("render menu in the document", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
  await waitFor(() => {
    expect(screen.getByText("Search User")).toBeTruthy();
    expect(screen.getByText("Database")).toBeTruthy();
  });
});
