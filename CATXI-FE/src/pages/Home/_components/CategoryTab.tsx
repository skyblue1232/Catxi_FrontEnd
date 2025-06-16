interface Props {
  direction: 'FROM_SCHOOL' | 'TO_SCHOOL';
  setDirection: (direction: 'FROM_SCHOOL' | 'TO_SCHOOL') => void;
}

const tabs = [
  { label: '학교에서 출발', value: 'FROM_SCHOOL' },
  { label: '학교에 도착', value: 'TO_SCHOOL' },
];

const CategoryTab = ({ direction, setDirection }: Props) => {
  return (
    <div className="flex w-full justify-center border-b-[1px] border-[#E0E0E0] mt-[1.75rem]">
      {tabs.map((tab) => (
        <div key={tab.value} className="relative">
          <button
            className="flex flex-col items-center px-[2.5rem] py-[1rem]"
            onClick={() => setDirection(tab.value as 'FROM_SCHOOL' | 'TO_SCHOOL')}
          >
            <span className="font-medium">{tab.label}</span>
          </button>
          {direction === tab.value && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[5rem] h-[2px] bg-[#7424F5] rounded-full"></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTab;

