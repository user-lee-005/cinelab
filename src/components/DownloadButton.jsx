import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import RegistrationModal from "./ResgistrationModal";
import emailjs from "emailjs-com";

const DownloadButton = ({ link, content, displayIcon }) => {
  const [openModal, setOpenModal] = useState();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    profession: "",
  });

  const handleOpenRegisterationModal = () => {
    setOpenModal(true);
  };

  const onConfirm = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ef4muf8", // Replace with your EmailJS service ID
        "template_dlx5ruf", // Replace with your EmailJS template ID
        formData,
        "mveWdrg-rKJ4M6I34" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          const a = document.createElement("a");
          a.href = link;
          a.download = true;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="flex items-center justify-center h-24">
      <button
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-900 transition duration-300"
        onClick={() => handleOpenRegisterationModal()}
      >
        {content}
        {displayIcon === "book" ? (
          <FontAwesomeIcon icon={faBook} className="ml-2" />
        ) : (
          ""
        )}
      </button>

      {openModal && (
        <RegistrationModal
          isOpen={openModal}
          onConfirm={onConfirm}
          setIsOpen={setOpenModal}
          title="Register Your Details"
          message="Get the brochure by registering your details below."
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default DownloadButton;
