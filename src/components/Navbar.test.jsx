import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Navbar from "./Navbar";

describe("Navbar Unit Test Cases", () => {
  beforeEach(cleanup);

  it("should render the Navbar component correctly", () => {
    const { container } = render(<Navbar />);
    expect(container).toBeInTheDocument();
  });

  it("should render the nav list items", () => {
    render(<Navbar />);
    const navItems = ["Home", "About Us", "Contact Us", "Client Testimonials"];
    navItems.forEach((navItem) =>
      expect(screen.getByText(navItem)).toBeInTheDocument()
    );
  });

  it("should show the menu items when closed menu is toggled", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByTestId("fontAwesomIcon"));
    const navItems = ["Home", "About Us", "Contact Us", "Client Testimonials"];
    navItems.forEach((navItem) =>
      expect(screen.getAllByText(navItem)).toHaveLength(2)
    );
  });

  it("should not show the menu items when open menu is toggled", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByTestId("fontAwesomIcon"));
    fireEvent.click(screen.getByTestId("fontAwesomIcon"));
    const navItems = ["Home", "About Us", "Contact Us", "Client Testimonials"];
    navItems.forEach((navItem) =>
      expect(screen.getAllByText(navItem)).toHaveLength(1)
    );
  });
});
