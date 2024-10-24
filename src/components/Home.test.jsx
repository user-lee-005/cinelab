import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import DownloadButton from "./DownloadButton";
import { useInView } from "react-intersection-observer";

// Mock the DownloadButton component
jest.mock("./DownloadButton", () =>
  jest.fn(() => <div data-testid="download-button">Download Button</div>)
);

// Mock the useInView hook
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    // Mock useInView to return true for inView state
    useInView.mockImplementation(() => ({
      ref: jest.fn(),
      inView: true,
    }));
  });

  it("renders the Home component with heading, description, and logo", () => {
    render(<Home />);

    // Check if heading is rendered
    expect(screen.getByText(/Welcome to Cinelab!/i)).toBeInTheDocument();

    // Check if description is rendered
    expect(
      screen.getByText(/At Cinelab, we bring your visual storytelling to life/i)
    ).toBeInTheDocument();

    // Check if the Cinelab logo is rendered with correct alt text
    const logo = screen.getByAltText("Cinelab Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/Cinelab Logo.png");
  });

  it("applies correct animation classes when inView is true", () => {
    render(<Home />);

    const heading = screen.getByText(/Welcome to Cinelab!/i);
    const description = screen.getByText(
      /At Cinelab, we bring your visual storytelling to life/i
    );
    const logo = screen.getByAltText("Cinelab Logo");

    // Check if animation classes are applied
    expect(heading).toHaveClass("animate-fade-in-title");
    expect(description).toHaveClass("animate-fade-in-para");
    expect(logo).toHaveClass("animate-slide-up");
  });

  it("renders the DownloadButton component", () => {
    render(<Home />);

    // Check if DownloadButton is rendered
    const downloadButton = screen.getByTestId("download-button");
    expect(downloadButton).toBeInTheDocument();
  });

  it("applies hover effect on the logo", () => {
    render(<Home />);

    // Check if logo has hover class
    const logo = screen.getByAltText("Cinelab Logo");
    expect(logo).toHaveClass("hover:scale-110");
  });

  it("applies no animation classes when inView is false", () => {
    useInView.mockImplementation(() => ({
      ref: jest.fn(),
      inView: false,
    }));
    render(<Home />);

    const heading = screen.getByText(/Welcome to Cinelab!/i);
    const description = screen.getByText(
      /At Cinelab, we bring your visual storytelling to life/i
    );
    const logo = screen.getByAltText("Cinelab Logo");

    // Check if animation classes are applied
    expect(heading).toHaveClass("opacity-0");
    expect(description).toHaveClass("opacity-0");
    expect(logo).toHaveClass("opacity-0");
  });
});
