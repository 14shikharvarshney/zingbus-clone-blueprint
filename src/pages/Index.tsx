import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import HomeScreen from "@/components/HomeScreen";
import SearchResultsScreen from "@/components/SearchResultsScreen";
import SeatSelectionModal from "@/components/SeatSelectionModal";
import BoardingPointModal from "@/components/BoardingPointModal";
import ReviewJourneyScreen from "@/components/ReviewJourneyScreen";
import CitySearchModal from "@/components/CitySearchModal";
import MyTripsScreen from "@/components/MyTripsScreen";
import SeatUpgradeScreen from "@/components/SeatUpgradeScreen";
import UpgradeConfirmationModal from "@/components/UpgradeConfirmationModal";
import { Trip } from "@/types/trip";

type Screen = 'home' | 'search-results' | 'review-journey' | 'my-trips' | 'seat-upgrade';
type ModalType = 'seat-selection' | 'boarding-point' | 'city-search' | 'upgrade-confirmation' | null;

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedBus, setSelectedBus] = useState<string>("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTripId, setCurrentTripId] = useState<string>("");
  const [upgradeDetails, setUpgradeDetails] = useState({
    currentSeat: "21B",
    selectedSeat: "",
    upgradeFee: 0
  });
  
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

  const handleProceedToPay = () => {
    // Simulate successful payment and create new trip
    const newTrip: Trip = {
      id: `trip_${Date.now()}`,
      route: "Delhi → Dehradun",
      date: "Wed, 03 Sep",
      time: "10:20 AM",
      pnr: "ZB" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      status: "Confirmed",
      busType: "Plus+ Narni Electric Seater/Sleeper (2+1)",
      seatNumber: upgradeDetails.currentSeat,
      hasUpgradeOption: true,
      isNewBooking: true
    };
    
    setTrips([newTrip]);
    setCurrentTripId(newTrip.id);
    setCurrentScreen('my-trips');
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your seat ${upgradeDetails.currentSeat} has been booked successfully.`,
    });
  };

  const handleViewUpgrades = (tripId: string) => {
    setCurrentTripId(tripId);
    setCurrentScreen('seat-upgrade');
  };

  const handleUpgradeSeatSelect = (selectedSeat: string, upgradeFee: number) => {
    setUpgradeDetails(prev => ({
      ...prev,
      selectedSeat,
      upgradeFee
    }));
    setActiveModal('upgrade-confirmation');
  };

  const handleConfirmUpgrade = () => {
    // Update the trip with new seat and remove upgrade option
    setTrips(prevTrips => 
      prevTrips.map(trip => 
        trip.id === currentTripId 
          ? { ...trip, seatNumber: upgradeDetails.selectedSeat, hasUpgradeOption: false }
          : trip
      )
    );
    
    setActiveModal(null);
    setCurrentScreen('my-trips');
    
    toast({
      title: "Upgrade Successful! ✨",
      description: `Your seat has been upgraded to ${upgradeDetails.selectedSeat}.`,
    });
  };

  const handleBottomNavChange = (tab: string) => {
    setActiveModal(null);
    
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'trips':
        setCurrentScreen('my-trips');
        break;
      default:
        // Handle other tabs as needed
        break;
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveModal(null);
  };

  const handleBackToSearch = () => {
    setCurrentScreen('search-results');
    setActiveModal(null);
  };

  const handleBackToTrips = () => {
    setCurrentScreen('my-trips');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onSearch={handleSearch} 
            onTabChange={handleBottomNavChange}
          />
        );
      case 'search-results':
        return (
          <SearchResultsScreen 
            onBack={handleBackToHome}
            onBusSelect={handleBusSelect}
          />
        );
      case 'review-journey':
        return (
          <ReviewJourneyScreen 
            onBack={handleBackToSearch} 
            onProceedToPay={handleProceedToPay}
          />
        );
      case 'my-trips':
        return (
          <MyTripsScreen 
            onViewUpgrades={handleViewUpgrades}
            trips={trips}
            onTabChange={handleBottomNavChange}
          />
        );
      case 'seat-upgrade':
        return (
          <SeatUpgradeScreen
            onBack={handleBackToTrips}
            onProceedToPay={handleUpgradeSeatSelect}
            currentSeat={upgradeDetails.currentSeat}
          />
        );
      default:
        return (
          <HomeScreen 
            onSearch={handleSearch} 
            onTabChange={handleBottomNavChange}
          />
        );
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
      
      <UpgradeConfirmationModal
        isOpen={activeModal === 'upgrade-confirmation'}
        onClose={() => setActiveModal(null)}
        onConfirmPayment={handleConfirmUpgrade}
        currentSeat={upgradeDetails.currentSeat}
        newSeat={upgradeDetails.selectedSeat}
        upgradeFee={upgradeDetails.upgradeFee}
      />
    </div>
  );
};

export default Index;
