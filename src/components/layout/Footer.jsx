import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-txt_gray font-semibold  p-4 text-2xl">
      <h2>Contact</h2>
      <ul className="flex justify-center gap-3 text-xl">
        <li className="hover:text-white hover:scale-150 duration-1000">
          <a
            href="https://github.com/Pichardo098?tab=repositories"
            target="_blank"
            rel="noopener"
            id="git"
          >
            <i className="bx bxl-github"></i>
          </a>
        </li>
        <li className="hover:text-blue-700 hover:scale-150 duration-1000">
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener"
            id="linkdn"
          >
            <i className="bx bxl-linkedin-square"></i>
          </a>
        </li>
      </ul>
      <p>Created by Jesús Pichardo.</p>
    </footer>
  );
};

export default Footer;
