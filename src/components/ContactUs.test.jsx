import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactUs from "./ContactUs";
import emailjs from "emailjs-com";
import { useInView } from "react-intersection-observer";

// Mock emailjs to prevent actual network requests during tests
jest.mock("emailjs-com", () => ({
  send: jest.fn(),
}));

// Mock the useInView hook from react-intersection-observer
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("ContactUs Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up the useInView mock to return inView as true
    useInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });
  });

  it("renders component with all form fields and submit button", () => {
    render(<ContactUs />);
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("focuses label animations when input fields are focused and blurred", async () => {
    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/Name/i);
    await waitFor(() => expect(nameInput).toBeInTheDocument());
    fireEvent.focus(nameInput);
    expect(nameInput.placeholder).toBe("Enter your name");
    fireEvent.blur(nameInput);
    expect(nameInput.placeholder).toBe("");
    const emailInput = screen.getByLabelText(/Email/i);
    await waitFor(() => expect(emailInput).toBeInTheDocument());
    fireEvent.focus(emailInput);
    expect(emailInput.placeholder).toBe("Enter your email");
    fireEvent.blur(emailInput);
    expect(emailInput.placeholder).toBe("");
    const messageInput = screen.getByLabelText(/Message/i);
    await waitFor(() => expect(messageInput).toBeInTheDocument());
    fireEvent.focus(messageInput);
    expect(messageInput.placeholder).toBe("Your message");
    fireEvent.blur(messageInput);
    expect(messageInput.placeholder).toBe("");
  });

  it("updates input values on user typing", () => {
    render(<ContactUs />);
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello there!" } });
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(messageInput.value).toBe("Hello there!");
  });

  it("calls emailjs service on form submission with correct parameters", async () => {
    render(<ContactUs />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello there!" },
    });
    emailjs.send.mockResolvedValueOnce({ status: 200 });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_r0jkfra",
      "template_2v2qlty",
      {
        from_name: "John Doe",
        to_Name: "Cinelab",
        message: JSON.stringify({
          message: "Hello there!",
          email: "john@example.com",
        }),
      },
      "mveWdrg-rKJ4M6I34"
    );
  });

  it("displays success alert on successful form submission", async () => {
    jest.spyOn(window, "alert");
    render(<ContactUs />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello there!" },
    });
    emailjs.send.mockResolvedValueOnce({ status: 200 });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Message sent successfully!")
    );
  });

  it("displays failure alert on failed form submission", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<ContactUs />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello there!" },
    });
    emailjs.send.mockRejectedValueOnce(new Error("Failed to send message"));
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to send message. Please try again."
      )
    );
  });
});
