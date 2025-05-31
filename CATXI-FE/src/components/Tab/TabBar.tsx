import { Link, useLocation } from "react-router-dom";
import ChatIcon from "../../assets/icons/ChatIcon.svg?react";
import ChatButton from "../../assets/icons/ChatButton.svg?react";
import HomeIcon from "../../assets/icons/HomeIcon.svg?react";
import HomeButton from "../../assets/icons/HomeButton.svg?react";
import MyIcon from "../../assets/icons/MyIcon.svg?react";
import MyButton from "../../assets/icons/MyButton.svg?react";

const TabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const showTabRoutes = ["/", "/chat", "/myPage"];

  const isTabVisible = showTabRoutes.some((path) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  });

  if (!isTabVisible) return null;

  const isCurrent = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  return (
    <nav
      className="
        fixed
        bottom-0
        h-[3.75rem]
        px-[3.906rem]
        w-full
        bg-white
        flex
        justify-center
        items-center
        shadow-[0_-4px_5px_0_rgba(0,0,0,0.05)]
      "
    >
      <Link to="/">
        {isCurrent("/") ? (
          <HomeButton />
        ) : (
          <HomeIcon />
        )}
      </Link>

      <div className="mx-[5rem]">
        {isCurrent("/chat") ? <ChatButton /> : <ChatIcon />}
      </div>

      <Link to="/myPage">
        {isCurrent("/myPage") ? (
          <MyButton />
        ) : (
          <MyIcon />
        )}
      </Link>
    </nav>
  );
};

export default TabBar;
