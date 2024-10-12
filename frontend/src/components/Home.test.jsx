import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component Unit Test Cases", () => {
  beforeEach(cleanup);

  it("should render the home component correctly", () => {
    render(<Home />);
    expect(screen.getByAltText("Cinelab Logo")).toBeInTheDocument();
  });
});
