import React from 'react';

interface Props {
  station: string | null;
  sort: 'departAt' | 'createdTime';
  onSelectLocation: (loc: string) => void;
  onSelectSort: (sort: 'departAt' | 'createdTime') => void;
}

const locations = ['SOSA_ST', 'YEOKGOK_ST', 'ETC'];

const LocationFilter: React.FC<Props> = ({
  station,
  sort,
  onSelectLocation,
  onSelectSort,
}) => {
  return (
    <div className="flex justify-between items-center ml-[1.625rem]">
      <div className="flex mt-[1.125rem] gap-[0.5rem]">
        {locations.map((loc) => (
          <button
            key={loc}
            className={`px-[0.625rem] py-[0.313rem] border border-[#E0E0E0] rounded-[30px] font-md text-[14px] ${
              station === loc
                ? 'bg-[#424242] text-white'
                : 'bg-[#FAFAFA] text-[#9E9E9E]'
            }`}
            onClick={() => onSelectLocation(loc)}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <div className="flex items-center gap-[0.5rem] mr-[1.625rem]">
        <span
          className={`text-[14px] cursor-pointer ${
            sort === 'departAt' ? 'text-black font-bold' : 'text-[#9E9E9E]'
          }`}
          onClick={() => onSelectSort('departAt')}
        >
          출발순
        </span>
        <div className="w-[1px] h-[8px] bg-[#E0E0E0]"></div>
        <span
          className={`text-[14px] cursor-pointer ${
            sort === 'createdTime' ? 'text-black font-bold' : 'text-[#9E9E9E]'
          }`}
          onClick={() => onSelectSort('createdTime')}
        >
          생성순
        </span>
      </div>
    </div>
  );
};

export default LocationFilter;
