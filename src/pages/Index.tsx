import { useState } from "react";
import HomeScreen from "@/components/HomeScreen";
import SearchResultsScreen from "@/components/SearchResultsScreen";
import SeatSelectionModal from "@/components/SeatSelectionModal";
import BoardingPointModal from "@/components/BoardingPointModal";
import ReviewJourneyScreen from "@/components/ReviewJourneyScreen";
import CitySearchModal from "@/components/CitySearchModal";

type Screen = 'home' | 'search-results' | 'review-journey';
type ModalType = 'seat-selection' | 'boarding-point' | 'city-search' | null;

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedBus, setSelectedBus] = useState<string>("");
  const [searchCriteria, setSearchCriteria] = useState({
    from: "Delhi",
    to: "Dehradun",
    date: "03 Sep 2025"
  });

  const handleSearch = () => {
    setCurrentScreen('search-results');
  };

  const handleBusSelect = (busId: string) => {
    setSelectedBus(busId);
    setActiveModal('seat-selection');
  };

  const handleSeatSelectionContinue = () => {
    setActiveModal('boarding-point');
  };

  const handleBoardingPointContinue = () => {
    setActiveModal(null);
    setCurrentScreen('review-journey');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveModal(null);
  };

  const handleBackToSearch = () => {
    setCurrentScreen('search-results');
    setActiveModal(null);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onSearch={handleSearch} />;
      case 'search-results':
        return (
          <SearchResultsScreen 
            onBack={handleBackToHome}
            onBusSelect={handleBusSelect}
          />
        );
      case 'review-journey':
        return <ReviewJourneyScreen onBack={handleBackToSearch} />;
      default:
        return <HomeScreen onSearch={handleSearch} />;
    }
  };

  return (
    <div className="relative">
      {renderCurrentScreen()}
      
      <SeatSelectionModal
        isOpen={activeModal === 'seat-selection'}
        onClose={() => setActiveModal(null)}
        onContinue={handleSeatSelectionContinue}
      />
      
      <BoardingPointModal
        isOpen={activeModal === 'boarding-point'}
        onClose={() => setActiveModal(null)}
        onContinue={handleBoardingPointContinue}
      />
      
      <CitySearchModal
        isOpen={activeModal === 'city-search'}
        onClose={() => setActiveModal(null)}
        onSelectCity={(city) => {
          // Handle city selection logic here
        }}
        title="Search From City"
      />
    </div>
  );
};

export default Index;
