interface JoinMessageProps {
  name: string;
}

const JoinMessage = ({ name }: JoinMessageProps) => {
  return (
    <div className="w-full text-center text-[12px] text-gray-400 px-4">
      <p className="bg-[#F2F6FC] text-gray-600 py-2 px-3 rounded-[5px] inline-block">
        {name}님이 채팅에 참여하였습니다.
      </p>
    </div>
  );
};

export default JoinMessage;
