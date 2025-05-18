import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="mx-[1.625rem] min-h-[calc(345px)] relative flex flex-col justify-start items-center bg-[#fefefe] text-black border border-red-500 shadow-lg">
      <div className="w-full h-10 bg-green-300 mb-4">배경 테스트</div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
