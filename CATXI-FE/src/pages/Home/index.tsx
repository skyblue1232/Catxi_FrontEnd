import { useState, useEffect } from 'react';
import CategoryTab from './_components/CategoryTab';
import LocationFilter from './_components/LocationFilter';
import ChatCardList from './_components/ChatCardList';
import FloatingButton from './_components/FloatingButton';

const HomePage = () => {
  const [direction, setDirection] = useState<'FROM_SCHOOL' | 'TO_SCHOOL'>('FROM_SCHOOL');
  const [selectedLocations, setSelectedLocations] = useState<Record<'FROM_SCHOOL' | 'TO_SCHOOL', string | null>>({
    FROM_SCHOOL: 'YEOKGOK_ST',
    TO_SCHOOL: 'YEOKGOK_ST',
  });
  const [sort, setSort] = useState<'departAt' | 'createdTime'>('departAt');
  const page = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectLocation = (location: string) => {
    setSelectedLocations((prev) => ({
      ...prev,
      [direction]: location,
    }));
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <CategoryTab direction={direction} setDirection={setDirection} />
      </div>

      <div className="sticky top-[52px] z-40 bg-[#FAFAFA]">
        <LocationFilter
          station={selectedLocations[direction]}
          sort={sort}
          onSelectLocation={handleSelectLocation}
          onSelectSort={setSort}
        />

        <div className="flex-1 overflow-y-scroll mb-[6rem]"> 
          <ChatCardList
            direction={direction}
            station={selectedLocations[direction] || ''}
            sort={sort}
            page={page}
          />
        </div>

        <div className="absolute bottom-6 right-6">
          <FloatingButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
