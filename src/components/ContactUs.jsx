import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import ConfirmationModal from "./ConfirmationModal";

const ContactUs = () => {
  const { ref: contactUsRef, inView: isContactUsVisible } = useInView({
    threshold: 0.1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // State for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // State for focus animation
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  //Modal fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (name && email && message) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [name, email, message]);

  const handleValueChange = (inputField) => (e) => {
    if (inputField === "name") {
      setName(e.target.value);
    } else if (inputField === "email") {
      setEmail(e.target.value);
    } else if (inputField === "message") {
      setMessage(e.target.value);
    }
  };

  const handleBlur = (setFocused) => (e) => {
    if (e.target.value === "") {
      setFocused(false);
    }
  };

  const handleClear = () => {
    setEmail("");
    setName("");
    setMessage("");
    setEmailFocused(false);
    setMessageFocused(false);
    setNameFocused(false);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = { name, email, message };

    try {
      const response = await fetch("http://127.0.0.1:3001/api/saveClientInfo", {
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
    <>
      {isLoading && <Loader />}
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
            onSubmit={handleSubmit}
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
                  value={name}
                  onFocus={() => setNameFocused(true)}
                  onBlur={handleBlur(setNameFocused)}
                  onChange={handleValueChange("name")}
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
                  value={email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={handleBlur(setEmailFocused)}
                  onChange={handleValueChange("email")}
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
                value={message}
                onFocus={() => setMessageFocused(true)}
                onBlur={handleBlur(setMessageFocused)}
                onChange={handleValueChange("message")}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-gray-400"
                placeholder={messageFocused && "Your message"}
              />
            </div>

            <button
              type="submit"
              className={`px-6 py-3 text-white font-semibold rounded-md transition-colors duration-300 ${
                isSubmitDisabled
                  ? "bg-gray-400"
                  : "bg-blue-700 hover:bg-blue-900"
              }`}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
            <button
              type="button"
              className="ml-4 px-6 py-3 text-white font-semibold rounded-md transition-colors duration-300 bg-blue-700 hover:bg-blue-900"
              onClick={handleClear}
            >
              Clear
            </button>
          </form>
        </div>
      </section>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          message={modalMessage}
          title={modalTitle}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default ContactUs;
