import { useState, useEffect } from 'react';
import CategoryTab from './_components/CategoryTab';
import LocationFilter from './_components/LocationFilter';
import ChatCardList from './_components/ChatCardList';
import FloatingButton from './_components/FloatingButton';

const HomePage = () => {
  const [direction, setDirection] = useState<'FROM_SCHOOL' | 'TO_SCHOOL'>('FROM_SCHOOL');
  const [selectedLocations, setSelectedLocations] = useState<Record<'FROM_SCHOOL' | 'TO_SCHOOL', string | null>>({
    FROM_SCHOOL: null,
    TO_SCHOOL: null,
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
    <div className="w-full">
      <CategoryTab direction={direction} setDirection={setDirection} />

      <div className="bg-[#FAFAFA] min-h-screen">
        <LocationFilter
          station={selectedLocations[direction]}
          sort={sort}
          onSelectLocation={handleSelectLocation}
          onSelectSort={setSort}
        />

        <ChatCardList
          direction={direction}
          station={selectedLocations[direction] || ''}
          sort={sort}
          page={page}
        />

        <FloatingButton />
      </div>
    </div>
  );
};

export default HomePage;
