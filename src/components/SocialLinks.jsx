import { FaGithubSquare } from "react-icons/fa"; // Updated GitHub icon
import { FaLinkedin } from "react-icons/fa"; // Updated LinkedIn icon
import { FaTwitter } from "react-icons/fa"; // Corrected Twitter icon
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDarkMode } from "../context/DarkModeContext";

const SocialLinks = () => {
  const linkedinUrl = "https://www.linkedin.com/in/dev-baljeet-gunghas-b6698421b/";
  const githubUrl = "https://github.com/BaljeetGunghas";
  const twitterUrl = "https://x.com/BaljeetGunghas";
  const { darkMode, toggleMode } = useDarkMode();
  
  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`${darkMode && "dark"} border-black dark:border-white`}>
      <p className="text-xl dark:text-white">Connect with me</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-6 text-4xl">
          <FaLinkedin
            onClick={() => handleClick(linkedinUrl)}
            className= " text-white text-3xl hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
          />
          <FaGithubSquare
            onClick={() => handleClick(githubUrl)}
            className=" text-white text-3xl hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
          />
          <FaTwitter
            onClick={() => handleClick(twitterUrl)}
            className=" text-white text-3xl hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
          />
        </div>
        <div
          className="text-2xl bg-black text-white dark:bg-white dark:text-black rounded-md p-1 cursor-pointer"
          onClick={toggleMode}
        >
          {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
