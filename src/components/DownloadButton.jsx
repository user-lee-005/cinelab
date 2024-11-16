import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import RegistrationModal from "./ResgistrationModal";
import Loader from "./Loader";

const DownloadButton = ({ link, content, displayIcon }) => {
  const [openModal, setOpenModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    profession: "",
    isBrochureDownloadDetails: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenRegisterationModal = () => {
    setOpenModal(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(
        "https://cinelab-server.onrender.com/api/saveClientInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      ).then(
        (response) => {
          setIsLoading(false);
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

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          message={modalMessage}
          title={modalTitle}
          setIsOpen={setIsModalOpen}
        />
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default DownloadButton;
