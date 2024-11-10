import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="divider"></div>
      <p className="footer-text">Made with ❤️ by Akshay Sharma</p>
      <p className="copyright">
        &copy; {new Date().getFullYear()} SyncNoz. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
