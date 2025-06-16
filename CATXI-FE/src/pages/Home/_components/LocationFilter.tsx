import React from 'react';

interface Props {
  station: string | null;
  sort: 'departAt' | 'createdTime';
  onSelectLocation: (loc: string) => void;
  onSelectSort: (sort: 'departAt' | 'createdTime') => void;
}

const locations = ['YEOKGOK_ST', 'SOSA_ST', 'ETC'];
const locationDisplayMap: Record<string, string> = {
  YEOKGOK_ST: '역곡역',
  SOSA_ST: '소사역',
  ETC: '그 외',
};


const LocationFilter: React.FC<Props> = ({
  station,
  sort,
  onSelectLocation,
  onSelectSort,
}) => {
  return (
    <div className="flex justify-between items-center px-[1.5rem] mt-[1.125rem] ">
      <div className="flex gap-[0.5rem]">
        {locations.map((loc) => (
          <button
            key={loc}
            className={`px-[0.625rem] py-[0.313rem] border border-[#E0E0E0] rounded-[30px] font-md text-[14px] ${
              (station ?? 'SOSA_ST') === loc
                ? 'bg-[#424242] text-white'
                : 'bg-[#FAFAFA] text-[#9E9E9E]'
            }`}
            onClick={() => onSelectLocation(loc)}
          >
            {locationDisplayMap[loc]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-[0.5rem]">
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
