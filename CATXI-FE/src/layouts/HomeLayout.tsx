import { Outlet } from "react-router-dom";
import TabBar from "../components/Tab/TabBar";
import CommonModal from "../components/Modal/UserModal";
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
          ">
        <Outlet />
        <TabBar />
        <CommonModal />
      </div>
    </ModalProvider>
  );
};

export default HomeLayout;
