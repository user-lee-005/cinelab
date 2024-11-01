import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import RegistrationForm from "./RegistrationForm";

const Modal = ({ isOpen, title, message, onConfirm, setIsOpen, formData, setFormData }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = (e) => {
    if (onConfirm) {
      onConfirm(e);
    }
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup to remove class when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black px-4 sm:px-0">
          <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 mt-14 relative shadow-lg">
            <button
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-700"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{title}</h2>
            <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">{message}</p>
            <RegistrationForm formData={formData} setFormData={setFormData} />
            <div className="flex justify-end space-x-2 sm:space-x-4 mt-3">
              <button
                onClick={(e) => handleConfirm(e)}
                className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
