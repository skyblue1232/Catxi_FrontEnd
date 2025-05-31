import { Outlet } from "react-router-dom";
import TabBar from "../components/Tab/TabBar";

const HomeLayout = () => {
  return (
    <div 
      className="
        w-full 
        h-screen 
        relative 
        flex 
        flex-col 
        ">
      <Outlet />
      <TabBar />
    </div>
  );
};

export default HomeLayout;
