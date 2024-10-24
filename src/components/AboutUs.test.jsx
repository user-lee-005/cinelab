import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import AboutUs from "./AboutUs";
import { useInView } from "react-intersection-observer";

// Mock the useInView hook
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("AboutUs Component Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the AboutUs component correctly", () => {
    useInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
    const { container } = render(<AboutUs />);
    expect(container).toBeInTheDocument();
  });

  it("should render the 'Our Team' section with correct member details", () => {
    useInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
    render(<AboutUs />);

    const teamHeading = screen.getByText("Our Team");
    expect(teamHeading).toBeInTheDocument();

    const memberName = screen.getByText("Leela Venkatesh V");
    const memberRole = screen.getByText("Founder, Cheif Colorist");
    expect(memberName).toBeInTheDocument();
    expect(memberRole).toBeInTheDocument();

    const memberImage = screen.getByAltText("Leela");
    expect(memberImage).toHaveAttribute("src", "/Leela.jpg");
  });

  it("should render the About Us section with correct content", () => {
    useInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
    render(<AboutUs />);

    const aboutUsHeading = screen.getByText("About Us");
    expect(aboutUsHeading).toBeInTheDocument();

    const aboutUsListItems = [
      "Experts in cinematic color grading and video editing",
      "Transforming raw footage into breathtaking visual stories",
      "Enhancing your content with state-of-the-art techniques",
      "Dedicated to making your projects stand out and inspire",
      "Your vision, brought to life with unmatched creativity",
    ];

    aboutUsListItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should render the Why Us section with correct content", () => {
    useInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
    render(<AboutUs />);

    const whyUsHeading = screen.getByText("Why Us");
    expect(whyUsHeading).toBeInTheDocument();

    const whyUsListItems = [
      "Industry-leading expertise in color grading and editing",
      "Collaborative approach to ensure your vision is achieved",
      "Seamless integration of visual effects to elevate your content",
      "Tailored solutions to match your project’s unique needs",
      "Timely delivery with uncompromising quality",
      "Trusted by professionals in film, TV, and digital media",
    ];

    whyUsListItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should apply animation classes when sections are in view", async () => {
    // Mock the first "useInView" call for the "Our Team" section
    useInView
      .mockReturnValueOnce({ ref: jest.fn(), inView: true }) // Mock for "Our Team"
      .mockReturnValueOnce({ ref: jest.fn(), inView: true }) // Mock for "About Us"
      .mockReturnValueOnce({ ref: jest.fn(), inView: true }) // Mock for "Why Us"
      .mockReturnValueOnce({ ref: jest.fn(), inView: true }); // Mock for "Why Us"

    render(<AboutUs />);

    await waitFor(() => {
      const teamHeading = screen.getByText("Our Team");
      const aboutUsHeading = screen.getByText("About Us");
      const whyUsHeading = screen.getByText("Why Us");

      expect(teamHeading).toHaveClass("animate-slide-in-left");
      expect(aboutUsHeading).toHaveClass("animate-slide-in-left");
      expect(whyUsHeading).toHaveClass("animate-slide-in-left");
    });
  });

  it("should not apply animation classes when sections are not in view", () => {
    // Mock the sections to be out of view
    useInView
      .mockReturnValueOnce({ ref: jest.fn(), inView: false }) // Mock for "Our Team"
      .mockReturnValueOnce({ ref: jest.fn(), inView: false }) // Mock for "About Us"
      .mockReturnValueOnce({ ref: jest.fn(), inView: false }); // Mock for "Why Us"

    render(<AboutUs />);

    const teamHeading = screen.getByText("Our Team");
    const aboutUsHeading = screen.getByText("About Us");
    const whyUsHeading = screen.getByText("Why Us");

    // Check if the animation classes are not applied when inView is false
    expect(teamHeading).not.toHaveClass("animate-slide-in-left");
    expect(aboutUsHeading).not.toHaveClass("animate-slide-in-left");
    expect(whyUsHeading).not.toHaveClass("animate-slide-in-left");
  });
});
