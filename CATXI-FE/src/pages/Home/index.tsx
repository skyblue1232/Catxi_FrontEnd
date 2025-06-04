import CategoryTab from './_components/CategoryTab';
import LocationFilter from './_components/LocationFilter';
import ChatCardList from './_components/ChatCardList';
import FloatingButton from './_components/FloatingButton';
import { useState } from 'react';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('학교에서 출발');
  const [selectedLocations, setSelectedLocations] = useState<Record<string, string | null>>({
    '학교에서 출발': null,
    '학교에 도착': null,
  });

  const handleSelectLocation = (location: string) => {
    setSelectedLocations((prev) => ({
      ...prev,
      [selectedTab]: location,
    }));
  };

  return (
    <div className="w-full">
      <CategoryTab selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <div className='bg-[#FAFAFA] min-h-screen'>
        <LocationFilter
          selectedTab={selectedTab}
          selectedLocation={selectedLocations[selectedTab]}
          onSelectLocation={handleSelectLocation}
        />
        <ChatCardList />
        <FloatingButton />
      </div>
    </div>
  );
};

export default HomePage;
