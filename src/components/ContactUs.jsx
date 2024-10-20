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

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      to_Name: "Cinelab",
      message: JSON.stringify({ message, email }),
    };

    emailjs
      .send(
        "service_r0jkfra", // Replace with your EmailJS service ID
        "template_2v2qlty", // Replace with your EmailJS template ID
        templateParams,
        "mveWdrg-rKJ4M6I34" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section
      id="contact-us"
      ref={contactUsRef}
      className="relative flex items-center justify-around min-h-screen bg-gray-900 w-full text-white overflow-hidden pt-20"
    >
      <div className="relative z-10 flex flex-col items-start justify-center px-8 space-y-6">
        <h2
          className={`text-4xl font-extrabold mb-4 leading-tight ${
            isContactUsVisible ? "animate-fade-in-para" : "opacity-0"
          }`}
        >
          Contact Us
        </h2>
        <p
          className={`text-lg leading-relaxed ${
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
          {/* Flex container for Name and Email */}
          <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
            {/* Name Input */}
            <div className="relative w-full md:w-1/2">
              <label
                className={`absolute left-4 top-1 text-lg font-semibold transition-all duration-300 ${
                  nameFocused
                    ? "transform -translate-x-1 -translate-y-6 bg-gray-900 w-16 flex rounded-md justify-center text-md text-gray-400"
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
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400"
                placeholder={nameFocused && "Enter your name"}
              />
            </div>

            {/* Email Input */}
            <div className="relative w-full md:w-1/2 mt-8 md:mt-0">
              <label
                className={`absolute left-4 top-1 text-lg font-semibold transition-all duration-300 ${
                  emailFocused
                    ? "transform -translate-x-1 -translate-y-6 bg-gray-900 w-16 flex rounded-md justify-center text-md text-gray-400"
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
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400"
                placeholder={emailFocused && "Enter your email"}
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-8 mt-4 relative">
            <label
              className={`absolute left-4 top-1 text-lg font-semibold transition-all duration-300 ${
                messageFocused
                  ? "transform -translate-x-1 -translate-y-6 bg-gray-900 w-24 flex rounded-md justify-center text-md text-gray-400"
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
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400"
              placeholder={messageFocused && "Your message"}
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors duration-300"
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
