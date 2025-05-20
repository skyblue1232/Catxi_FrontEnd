import { Outlet } from "react-router-dom";

const MainLayout = () => {
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
    </div>
  );
};

export default MainLayout;
