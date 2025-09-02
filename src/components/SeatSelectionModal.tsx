import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

type SeatType = 'available' | 'booked' | 'female' | 'selected';

interface Seat {
  id: string;
  type: SeatType;
  price?: number;
  isUpper?: boolean;
}

const SeatSelectionModal = ({ isOpen, onClose, onContinue }: SeatSelectionModalProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<'lower' | 'upper'>('lower');

  // Seat layout for lower deck
  const lowerSeats: Seat[] = [
    // Row 1
    { id: '1A', type: 'available', price: 288 },
    { id: '1B', type: 'available', price: 288 },
    { id: '1C', type: 'available', price: 288 },
    
    // Row 2 
    { id: '2A', type: 'female', price: 319 },
    { id: '2B', type: 'female', price: 319 },
    { id: '2C', type: 'available', price: 288 },

    // Row 3
    { id: '3A', type: 'available', price: 288 },
    { id: '3B', type: 'booked' },
    { id: '3C', type: 'available', price: 288 },

    // More seats...
    { id: '4A', type: 'available', price: 288 },
    { id: '4B', type: 'available', price: 288 },
    { id: '4C', type: 'available', price: 288 },

    { id: '5A', type: 'available', price: 288 },
    { id: '5B', type: 'available', price: 288 },
    { id: '5C', type: 'available', price: 288 },

    { id: '6A', type: 'booked' },
    { id: '6B', type: 'available', price: 288 },
    { id: '6C', type: 'available', price: 288 },

    { id: '7A', type: 'female', price: 319 },
    { id: '7B', type: 'available', price: 288 },
    { id: '7C', type: 'available', price: 288 },

    { id: '8A', type: 'available', price: 288 },
    { id: '8B', type: 'female', price: 319 },
    { id: '8C', type: 'female', price: 319 }
  ];

  const priceCategories = [
    { label: 'All Seats', count: 29, active: true },
    { label: '₹ 288', count: 1, price: 288 },
    { label: '₹ 319', count: 2, price: 319 },
    { label: '₹ 357', count: 2, price: 357 },
    { label: '₹ 36', count: 1, price: 36 }
  ];

  const handleSeatClick = (seatId: string, seatType: SeatType) => {
    if (seatType === 'booked') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const getSeatStyle = (seat: Seat): string => {
    const isSelected = selectedSeats.includes(seat.id);
    
    if (isSelected) return 'bg-zingbus-purple text-white border-zingbus-purple';
    
    switch (seat.type) {
      case 'available':
        return 'bg-white border-gray-300 text-gray-700 hover:border-zingbus-purple';
      case 'booked':
        return 'bg-gray-400 border-gray-400 text-white cursor-not-allowed';
      case 'female':
        return 'bg-zingbus-pink border-pink-300 text-gray-700';
      default:
        return 'bg-white border-gray-300 text-gray-700';
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = lowerSeats.find(s => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  const getOriginalPrice = () => {
    return Math.round(getTotalPrice() * 1.2); // Simulate 20% discount
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer" onClick={onClose} />
          <div className="text-center">
            <h2 className="font-semibold">Delhi to Dehradun</h2>
            <span className="text-xs text-gray-500">03 Sep, Wednesday</span>
          </div>
          <div className="bg-zingbus-purple text-white px-2 py-1 rounded text-xs">
            Plus+
          </div>
        </div>

        {/* Price Filter Tabs */}
        <div className="px-4 py-3 border-b">
          <div className="flex space-x-2 overflow-x-auto">
            {priceCategories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  category.active 
                    ? 'bg-zingbus-purple text-white' 
                    : 'border border-zingbus-purple text-zingbus-purple'
                }`}
              >
                {category.label} {category.count && `(${category.count})`}
              </button>
            ))}
          </div>
        </div>

        {/* Seat Map */}
        <div className="flex-1 p-4">
          {/* Deck Toggle */}
          <div className="flex mb-4">
            <button
              className={`px-4 py-2 rounded-l-lg ${
                selectedDeck === 'lower' 
                  ? 'bg-zingbus-purple text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSelectedDeck('lower')}
            >
              Lower
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg ${
                selectedDeck === 'upper' 
                  ? 'bg-zingbus-purple text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSelectedDeck('upper')}
            >
              Upper
            </button>
          </div>

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
              {lowerSeats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                return (
                  <button
                    key={seat.id}
                    className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xs font-medium ${getSeatStyle(seat)}`}
                    onClick={() => handleSeatClick(seat.id, seat.type)}
                    disabled={seat.type === 'booked'}
                  >
                    {isSelected ? seat.id.charAt(0) : ''}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {selectedSeats.length > 0 && (
          <div className="bg-white border-t p-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">₹ {getTotalPrice()}</div>
              <div className="text-sm text-gray-500">
                <span className="line-through">₹ {getOriginalPrice()}</span> for {selectedSeats.length} Seats
              </div>
            </div>
            <Button 
              className="bg-zingbus-purple hover:bg-zingbus-purple/90 text-white px-6 py-3 rounded-lg flex items-center"
              onClick={onContinue}
            >
              Go to Checkout →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelectionModal;