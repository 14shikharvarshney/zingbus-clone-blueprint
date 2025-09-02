import { ChevronLeft, Check, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBar from "./StatusBar";

interface BusResult {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  seats: string;
  busType: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  isPlusService: boolean;
}

interface SearchResultsScreenProps {
  onBack: () => void;
  onBusSelect: (busId: string) => void;
}

const SearchResultsScreen = ({ onBack, onBusSelect }: SearchResultsScreenProps) => {
  const buses: BusResult[] = [
    {
      id: "1",
      departureTime: "11:10 AM",
      arrivalTime: "17:10 PM",
      duration: "6h 0m",
      seats: "29 Seats (8 Single)",
      busType: "Electric Seater/Sleeper (2+1)",
      originalPrice: 342,
      discountedPrice: 288,
      savings: 54,
      isPlusService: true
    },
    {
      id: "2",
      departureTime: "23:40 PM",
      arrivalTime: "05:40 AM",
      duration: "6h 0m",
      seats: "31 Seats (7 Single)",
      busType: "Electric Seater/Sleeper (2+1)",
      originalPrice: 378,
      discountedPrice: 318,
      savings: 60,
      isPlusService: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer" onClick={onBack} />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-gray-900">Delhi to Dehradun</h1>
              <button className="text-sm text-zingbus-purple font-medium border border-zingbus-purple px-2 py-1 rounded">
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-500">3rd September, Wednesday</p>
          </div>
        </div>
      </div>

      {/* Luxury Banner */}
      <div className="bg-gradient-purple mx-4 mt-3 px-4 py-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-yellow-900 text-lg">☀️</span>
          </div>
          <span className="text-white font-medium">Luxury bus rides at best prices</span>
        </div>
        <button className="bg-white text-zingbus-purple px-3 py-1 rounded-lg text-sm font-medium">
          Know More
        </button>
      </div>

      {/* Toggle */}
      <div className="mx-4 mt-3 flex bg-white rounded-lg p-1 shadow-sm">
        <div className="flex-1 bg-zingbus-purple text-white py-2 rounded-lg text-center">
          <span className="font-medium">zingbus</span>
        </div>
        <div className="flex-1 text-gray-600 py-2 text-center">
          <span className="font-medium">valuebus</span>
          <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 ml-2 rounded">NEW</span>
        </div>
      </div>

      {/* RoutePass Banner */}
      <div className="mx-4 mt-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-4 flex items-center justify-between text-white">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">⭐ routepass</span>
          </div>
          <h3 className="font-semibold">Get Delhi to Dehradun seats at flat</h3>
          <h3 className="font-semibold">₹249</h3>
          <p className="text-sm opacity-90">Apply on checkout</p>
        </div>
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">👋</span>
        </div>
      </div>

      {/* Bus Results */}
      <div className="flex-1 px-4 mt-4 pb-20">
        {buses.map((bus) => (
          <div 
            key={bus.id}
            className="bg-white rounded-lg shadow-card p-4 mb-3 cursor-pointer"
            onClick={() => onBusSelect(bus.id)}
          >
            {bus.isPlusService && (
              <div className="inline-block bg-zingbus-purple text-white px-2 py-1 rounded text-xs font-medium mb-3">
                Plus+
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold">{bus.departureTime}</span>
                <span className="text-gray-400">—</span>
                <span className="text-lg font-semibold">{bus.arrivalTime}</span>
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-right">
                <div className="text-gray-400 line-through text-sm">₹{bus.originalPrice}</div>
                <div className="text-xl font-bold">₹ {bus.discountedPrice}</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-2">
              {bus.duration} — {bus.seats}
            </div>
            
            <div className="text-sm text-gray-600 mb-3">
              {bus.busType}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>🔌</span>
                <span>💺</span>
                <span>📍</span>
                <span className="text-zingbus-purple">+ Other Amenities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-zingbus-green text-white px-2 py-1 rounded text-xs font-medium">
                  ₹ {bus.savings} Off
                </div>
                <button className="text-zingbus-purple text-sm flex items-center">
                  View Details <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Filter */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
            Cheapest First
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
            Seater
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
            Sleeper
          </button>
          <button className="bg-zingbus-purple text-white px-4 py-2 rounded-lg text-sm flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Filter & Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsScreen;