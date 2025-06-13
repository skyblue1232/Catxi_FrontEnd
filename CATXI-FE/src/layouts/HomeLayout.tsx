import { Outlet } from "react-router-dom";
import TabBar from "../components/Tab/TabBar";
import { ModalProvider } from "../contexts/ModalContext";

const HomeLayout = () => {
  return (
    <ModalProvider>
      <div
        className="
          w-full
          h-screen 
          relative 
          flex 
          flex-col 
          "
      >
        <Outlet />
        <TabBar />
      </div>
    </ModalProvider>
  );
};

export default HomeLayout;
