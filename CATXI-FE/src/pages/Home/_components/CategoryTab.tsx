interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const tabs = ['학교에서 출발', '학교에 도착'];

const CategoryTab: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex w-full justify-center border-b border-[#E0E0E0] mt-[4.25rem]">
      {tabs.map((tab) => (
        <div key={tab} className="relative">
          <button
            className="flex flex-col items-center px-[2.5rem] py-[1rem]"
            onClick={() => setSelectedTab(tab)}
          >
            <span className='font-medium'>
              {tab}
            </span>
          </button>
          {selectedTab === tab && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[5rem] h-[2px] bg-[#7424F5] rounded-full"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTab;
