import React, { useState } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDarkMode } from "../context/DarkModeContext";
const SocialLinks = () => {
  const linkedinUrl = "https://www.linkedin.com/in/avinashs46/";
  const githubUrl = "https://github.com/avinashsingh108";
  const twitterUrl = "https://x.com/_Avi108_";
  const { darkMode, toggleMode } = useDarkMode();
  
  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className={`${darkMode && "dark"} border-t pt-1 border-black dark:border-white`}>
      <p className="text-xl dark:text-white">Connect with me on:</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-6 text-4xl">
          <IoLogoLinkedin
            onClick={() => handleClick(linkedinUrl)}
            className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
          />
          <FaSquareGithub
            onClick={() => handleClick(githubUrl)}
            className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
          />
          <FaSquareXTwitter
            onClick={() => handleClick(twitterUrl)}
            className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
          />
        </div>
        <div className="text-2xl bg-black text-white dark:bg-white dark:text-black rounded-md p-1  cursor-pointer" onClick={toggleMode}>
          {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
