import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import AboutUs from "./AboutUs";
import { useInView } from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("AboutUs Unit Test Cases", () => {
  let mockInView = jest.fn();

  beforeEach(() => {
    cleanup();
    mockInView.mockClear();
    useInView.mockReturnValue({
      ref: jest.fn(),
      inView: mockInView,
    });
  });

  it("should render the AboutUs component correctly", () => {
    mockInView.mockReturnValue(false);
    const { container } = render(<AboutUs />);
    expect(container).toBeInTheDocument();
  });

  it("should render the 'Our Team' heading", () => {
    mockInView.mockReturnValue(false);
    render(<AboutUs />);
    const heading = screen.getByText("Our Team");
    expect(heading).toBeInTheDocument();
  });

  it("should render the team member's name and role", () => {
    mockInView.mockReturnValue(false);
    render(<AboutUs />);
    const name = screen.getByText("Leela Venkatesh V");
    const role = screen.getByText("Founder, Cheif Colorist");
    expect(name).toBeInTheDocument();
    expect(role).toBeInTheDocument();
  });

  it("should render the About Us section with the correct content", () => {
    mockInView.mockReturnValue(false);
    render(<AboutUs />);
    const aboutUsHeading = screen.getByText("About Us");
    const aboutUsListItems = [
      "Experts in cinematic color grading and video editing",
      "Transforming raw footage into breathtaking visual stories",
      "Enhancing your content with state-of-the-art techniques",
      "Dedicated to making your projects stand out and inspire",
      "Your vision, brought to life with unmatched creativity",
    ];
    expect(aboutUsHeading).toBeInTheDocument();
    aboutUsListItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should render the Why Us section with the correct content", () => {
    mockInView.mockReturnValue(false);
    render(<AboutUs />);
    const whyUsHeading = screen.getByText("Why Us");
    const whyUsListItems = [
      "Industry-leading expertise in color grading and editing",
      "Collaborative approach to ensure your vision is achieved",
      "Seamless integration of visual effects to elevate your content",
      "Tailored solutions to match your project’s unique needs",
      "Timely delivery with uncompromising quality",
      "Trusted by professionals in film, TV, and digital media",
    ];
    expect(whyUsHeading).toBeInTheDocument();
    whyUsListItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should apply the correct animation classes when in view", () => {
    mockInView.mockReturnValue(true);
    render(<AboutUs />);
    const teamHeading = screen.getByText("Our Team");
    const aboutUsHeading = screen.getByText("About Us");
    const whyUsHeading = screen.getByText("Why Us");
    expect(teamHeading).toHaveClass("animate-slide-in-left");
    expect(aboutUsHeading).toHaveClass("animate-slide-in-left");
    expect(whyUsHeading).toHaveClass("animate-slide-in-left");
  });

  it("should display the team member image with correct source", () => {
    mockInView.mockReturnValue(false);
    render(<AboutUs />);
    const teamImage = screen.getByAltText("Leela");
    expect(teamImage).toHaveAttribute("src", "/Leela.jpg");
  });
});
