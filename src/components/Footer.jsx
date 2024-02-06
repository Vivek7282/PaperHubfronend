import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="text-sm">
        Developed by PaperHub Team &copy; {new Date().getFullYear()}. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
