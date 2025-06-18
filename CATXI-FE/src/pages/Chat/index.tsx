import TopStatusBar from "./_components/TopStatusBar.tsx";
import DepartureInfoBox from "./_components/DepartureInfoBox.tsx";
import ChatBoard from "./_components/ChatBoard";

const ChatPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TopStatusBar />
      <DepartureInfoBox />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ChatBoard />
      </div>
    </div>
  );
};


export default ChatPage;
