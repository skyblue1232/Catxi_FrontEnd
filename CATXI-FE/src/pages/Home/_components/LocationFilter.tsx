import React, { useState } from 'react';

interface Props {
  selectedTab: string;
  selectedLocation: string | null;
  onSelectLocation: (loc: string) => void;
}

const locations = ['역곡역', '소사역', '그 외'];

const LocationFilter: React.FC<Props> = ({
  selectedTab: _selectedTab,
  selectedLocation,
  onSelectLocation,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<'출발순' | '생성순'>('출발순');

  const handleOrderClick = (order: '출발순' | '생성순') => {
    setSelectedOrder(order);
  };

  return (
    <div className="flex justify-between items-center ml-[1.625rem]">
      <div className="flex mt-[1.125rem] gap-[0.5rem]">
        {locations.map((loc) => (
          <button
            key={loc}
            className={`px-[0.625rem] py-[0.313rem] border border-[#E0E0E0] rounded-[30px] font-md text-[14px] ${
              selectedLocation === loc
                ? 'bg-[#424242] text-white'
                : 'bg-[#FAFAFA] text-[#9E9E9E]'
            }`}
            onClick={() => onSelectLocation(loc)}
          >
            {loc}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-[0.5rem] mr-[1.625rem]">
        <span
          className={`text-[14px] cursor-pointer ${
            selectedOrder === '출발순' ? 'text-black font-bold' : 'text-[#9E9E9E]'
          }`}
          onClick={() => handleOrderClick('출발순')}
        >
          출발순
        </span>
        <div className="w-[1px] h-[8px] bg-[#E0E0E0]"></div>
        <span
          className={`text-[14px] cursor-pointer ${
            selectedOrder === '생성순' ? 'text-black' : 'text-[#9E9E9E]'
          }`}
          onClick={() => handleOrderClick('생성순')}
        >
          생성순
        </span>
      </div>
    </div>
  );
};

export default LocationFilter;
