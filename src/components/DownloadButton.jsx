import React from "react";

const DownloadButton = ({ link, content }) => {
  return (
    <div className="flex items-center justify-center h-24">
      <a
        href={link}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-900 transition duration-300"
      >
        {content}
      </a>
    </div>
  );
};

export default DownloadButton;
