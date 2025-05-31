import { useState } from 'react';
import ChatCard from './ChatCard';
import { useNavigate } from 'react-router-dom';

interface ChatData {
  id: number;
  driver: string;
  matchCount: number;
  departure: string;
  arrival: string;
  departureTime: string;
  currentPassengers: number;
  maxPassengers: number;
}

const mockData: ChatData[] = [
  {
    id: 1,
    driver: '김*준 (kdaw12)',
    matchCount: 4,
    departure: '역곡역',
    arrival: '학생회관',
    departureTime: '09:47',
    currentPassengers: 2,
    maxPassengers: 4,
  },
  {
    id: 2,
    driver: '이*준 (sdaw12)',
    matchCount: 3,
    departure: '역곡역',
    arrival: '학생회관',
    departureTime: '09:49',
    currentPassengers: 2,
    maxPassengers: 4,
  },
];

const ChatCardList = () => {
  const [chatData] = useState<ChatData[]>(mockData);
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex flex-col gap-4">
      {chatData.map((item) => (
        <ChatCard
          key={item.id}
          data={item}
          onClick={() => navigate(`/chat/${item.id}`)}
        />
      ))}
    </div>
  );
};

export default ChatCardList;
