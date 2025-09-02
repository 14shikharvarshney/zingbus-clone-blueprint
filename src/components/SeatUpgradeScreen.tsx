import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBar from "./StatusBar";

interface SeatUpgradeScreenProps {
  onBack: () => void;
  onProceedToPay: (selectedSeat: string, upgradeFee: number) => void;
  currentSeat: string;
}

type SeatType = 'current' | 'booked' | 'upgrade' | 'available';

interface Seat {
  id: string;
  type: SeatType;
  upgradeFee?: number;
  isUpper?: boolean;
}

const SeatUpgradeScreen = ({ onBack, onProceedToPay, currentSeat }: SeatUpgradeScreenProps) => {
  const [selectedUpgradeSeat, setSelectedUpgradeSeat] = useState<string>("");

  // Updated seat layout with upgrade options
  const seats: Seat[] = [
    // Row 1 - Premium single sleepers
    { id: '1A', type: 'upgrade', upgradeFee: 149 },
    { id: '1B', type: 'upgrade', upgradeFee: 149 },
    
    // Row 2 - Window seats  
    { id: '2A', type: 'upgrade', upgradeFee: 99 },
    { id: '2B', type: 'booked' },
    { id: '2C', type: 'available' },

    // Row 3
    { id: '3A', type: 'available' },
    { id: '3B', type: 'booked' },
    { id: '3C', type: 'available' },

    // Row 4 - Has an upgrade option
    { id: '4A', type: 'upgrade', upgradeFee: 99 },
    { id: '4B', type: 'available' },
    { id: '4C', type: 'available' },

    // More regular seats...
    { id: '5A', type: 'available' },
    { id: '5B', type: 'booked' },
    { id: '5C', type: 'available' },

    // User's current seat
    { id: currentSeat, type: 'current' },

    // More seats
    { id: '7A', type: 'booked' },
    { id: '7B', type: 'available' },
    { id: '7C', type: 'available' },

    { id: '8A', type: 'available' },
    { id: '8B', type: 'available' },
    { id: '8C', type: 'available' }
  ];

  const handleSeatClick = (seatId: string, seatType: SeatType, upgradeFee?: number) => {
    if (seatType !== 'upgrade') return;
    
    if (selectedUpgradeSeat === seatId) {
      setSelectedUpgradeSeat("");
    } else {
      setSelectedUpgradeSeat(seatId);
    }
  };

  const getSeatStyle = (seat: Seat): string => {
    const isSelected = selectedUpgradeSeat === seat.id;
    
    if (isSelected) return 'bg-zingbus-purple text-white border-zingbus-purple transform scale-105';
    
    switch (seat.type) {
      case 'current':
        return 'bg-blue-100 border-blue-500 border-2 text-blue-700 cursor-not-allowed';
      case 'upgrade':
        return 'bg-zingbus-green border-zingbus-green text-white hover:scale-105 transform transition-transform cursor-pointer';
      case 'booked':
        return 'bg-gray-400 border-gray-400 text-white cursor-not-allowed';
      case 'available':
        return 'bg-white border-gray-300 text-gray-700';
      default:
        return 'bg-white border-gray-300 text-gray-700';
    }
  };

  const getSelectedUpgradeFee = () => {
    const selectedSeat = seats.find(s => s.id === selectedUpgradeSeat);
    return selectedSeat?.upgradeFee || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm flex items-center">
        <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer mr-3" onClick={onBack} />
        <h1 className="text-lg font-semibold">Upgrade Your Seat</h1>
      </div>

      {/* Legend */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-card">
        <h3 className="font-semibold mb-3">Seat Legend</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
            <span>Your Current Seat</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-zingbus-green rounded"></div>
            <span>Available for Upgrade</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            <span>Regular Seat</span>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-card p-4">
          {/* Bus Layout */}
          <div className="bg-gray-100 rounded-lg p-4 relative">
            {/* Steering Wheel */}
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {seats.map((seat) => {
                const isSelected = selectedUpgradeSeat === seat.id;
                const isCurrent = seat.id === currentSeat;
                
                return (
                  <div key={seat.id} className="relative">
                    <button
                      className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 ${getSeatStyle(seat)}`}
                      onClick={() => handleSeatClick(seat.id, seat.type, seat.upgradeFee)}
                      disabled={seat.type === 'booked' || seat.type === 'current' || seat.type === 'available'}
                    >
                      {isCurrent ? '✓' : (isSelected ? seat.id.charAt(0) : '')}
                    </button>
                    
                    {seat.type === 'upgrade' && seat.upgradeFee && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-zingbus-green text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                        +₹{seat.upgradeFee}
                      </div>
                    )}
                    
                    {isCurrent && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                        Current
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {selectedUpgradeSeat && (
        <div className="bg-white border-t p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Upgrade Fee</div>
            <div className="text-xl font-bold">₹ {getSelectedUpgradeFee()}</div>
            <div className="text-sm text-gray-500">
              {currentSeat} → {selectedUpgradeSeat}
            </div>
          </div>
          <Button 
            className="bg-zingbus-purple hover:bg-zingbus-purple/90 text-white px-6 py-3 rounded-lg"
            onClick={() => onProceedToPay(selectedUpgradeSeat, getSelectedUpgradeFee())}
          >
            Proceed to Pay
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeatUpgradeScreen;