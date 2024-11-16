import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const { ref: contactUsRef, inView: isContactUsVisible } = useInView({
    threshold: 0.1,
  });

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFocus = (setFocused) => (e) => {
    if (e.target.value !== "") {
      setFocused(true);
    }
  };

  const handleBlur = (setFocused) => (e) => {
    if (e.target.value === "") {
      setFocused(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, message };

    try {
      const response = await fetch("https://cinelab-server.onrender.com//api/saveClientInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setIsModalOpen(true);
        setModalTitle("Thank you for reaching out!");
        setModalMessage(`We appreciate you contacting us. One of our representatives will get back to you shortly.
          In the meantime, feel free to browse through our website for more information. 
          If your inquiry is urgent, please use the contact information provided on our site to speak with us directly.
          Thank you for your interest, and we look forward to assisting you!`);
        console.log("Saved client:", result);

        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setIsModalOpen(true);
        setModalTitle("Submission Failed");
        setModalMessage(
          `We encountered an issue while processing your request. Error: ${
            errorData.error || "Unknown error"
          }.
        Please try again later or reach out to us directly through the contact information provided on our website.
        We apologize for the inconvenience.`
        );
      }
    } catch (error) {
      console.error("Error saving client details:", error);
      setIsModalOpen(true);
      setModalTitle("We apologize for the inconvenience.");
      setModalMessage(
        "Should you need further assistance, please do not hesitate to contact us at the phone number provided below or via email."
      );
    }
    setIsLoading(false);
  };

  return (
    <section
      id="contact-us"
      ref={contactUsRef}
      className="relative flex items-center justify-around min-h-screen bg-gray-900 text-white overflow-hidden pt-20 px-4 md:px-8 lg:px-0 lg:w-full"
    >
      <div className="relative z-10 flex flex-col items-start justify-center px-4 md:px-8 lg:px-20 space-y-6 w-full lg:max-w-none max-w-lg mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-extrabold mb-4 leading-tight ${
            isContactUsVisible ? "animate-fade-in-para" : "opacity-0"
          }`}
        >
          Contact Us
        </h2>
        <p
          className={`text-md md:text-lg leading-relaxed ${
            isContactUsVisible ? "animate-fade-in-para" : "opacity-0"
          }`}
        >
          We'd love to hear from you! Whether you're looking for more
          information on our services, want to discuss your project, or simply
          have a question, feel free to get in touch.
        </p>
        <form
          className={`w-full ${
            isContactUsVisible ? "animate-slide-in-left" : "opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
            <div className="relative w-full md:w-1/2 mb-6 md:mb-0">
              <label
                className={`absolute left-4 top-1 text-sm font-semibold transition-all duration-300 ${
                  nameFocused
                    ? "transform -translate-x-1 -translate-y-6 bg-gray-900 w-16 flex rounded-md justify-center text-gray-400"
                    : ""
                }`}
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onFocus={() => setNameFocused(true)}
                onBlur={handleBlur(setNameFocused)}
                onChange={(e) => {
                  handleFocus(setNameFocused);
                  setName(e.target.value);
                }}
                value={name}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400 text-sm"
                placeholder={nameFocused && "Enter your name"}
              />
            </div>

            <div className="relative w-full md:w-1/2">
              <label
                className={`absolute left-4 top-1 text-sm font-semibold transition-all duration-300 ${
                  emailFocused
                    ? "transform -translate-x-1 -translate-y-6 bg-gray-900 w-16 flex rounded-md justify-center text-gray-400"
                    : ""
                }`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onFocus={() => setEmailFocused(true)}
                onBlur={handleBlur(setEmailFocused)}
                onChange={(e) => {
                  handleFocus(setEmailFocused);
                  setEmail(e.target.value);
                }}
                value={email}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400 text-sm"
                placeholder={emailFocused && "Enter your email"}
              />
            </div>
          </div>

          <div className="mb-8 mt-4 relative">
            <label
              className={`absolute left-4 top-1 text-sm font-semibold transition-all duration-300 ${
                messageFocused
                  ? "transform -translate-x-1 -translate-y-6 bg-gray-900 w-24 flex rounded-md justify-center text-gray-400"
                  : ""
              }`}
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              onFocus={() => setMessageFocused(true)}
              onBlur={handleBlur(setMessageFocused)}
              onChange={(e) => {
                handleFocus(setMessageFocused);
                setMessage(e.target.value);
              }}
              value={message}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400 text-sm"
              placeholder={messageFocused && "Your message"}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors duration-300 text-sm md:text-base"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
