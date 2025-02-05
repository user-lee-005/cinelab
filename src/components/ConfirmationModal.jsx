import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Modal = ({ isOpen, title, message, onClose, onConfirm, setIsOpen }) => {
  const hanldeClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              className="absolute right-6 top-4 text-gray-400 hover:text-gray-700"
              onClick={hanldeClose}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onConfirm ? onConfirm : hanldeClose}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
