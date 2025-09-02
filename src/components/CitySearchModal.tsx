import { useState } from "react";
import { ChevronLeft, Search, MapPin } from "lucide-react";

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
  title: string;
}

const CitySearchModal = ({ isOpen, onClose, onSelectCity, title }: CitySearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const popularCities = [
    "Delhi", "Manali", "Shimla", "Gorakhpur", "Jaipur", "Lucknow"
  ];

  const filteredCities = popularCities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <ChevronLeft 
          className="w-6 h-6 text-zingbus-purple cursor-pointer mr-3" 
          onClick={onClose} 
        />
        <h1 className="text-lg font-semibold text-center flex-1">{title}</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pr-10 border-2 border-zingbus-purple rounded-lg text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Popular Cities */}
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-500 mb-4">POPULAR CITIES</h2>
        <div className="space-y-0">
          {filteredCities.map((city) => (
            <button
              key={city}
              className="w-full flex items-center py-4 border-b border-gray-100 last:border-b-0 text-left"
              onClick={() => {
                onSelectCity(city);
                onClose();
              }}
            >
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-lg text-gray-900">{city}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySearchModal;