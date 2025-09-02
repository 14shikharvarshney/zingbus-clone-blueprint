import { ArrowUpDown, Calendar, Gift, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBar from "./StatusBar";
import BottomNavigation from "./BottomNavigation";

interface HomeScreenProps {
  onSearch: () => void;
  onTabChange?: (tab: string) => void;
}

const HomeScreen = ({ onSearch, onTabChange }: HomeScreenProps) => {
  const categories = [
    { name: "zingbus EV", color: "bg-zingbus-green", textColor: "text-white" },
    { name: "Leh", color: "bg-zingbus-purple", textColor: "text-white" },
    { name: "zingbus Maxx", color: "bg-black", textColor: "text-white" },
    { name: "Offbeat Explorer", color: "bg-gradient-to-br from-purple-600 to-pink-600", textColor: "text-white" },
    { name: "Plus", color: "bg-zingbus-purple", textColor: "text-white" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-zingbus-purple rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">zingbus</span>
        </div>
        <div className="bg-zingbus-gold px-3 py-1 rounded-full flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
          <span className="text-sm font-medium">200</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Referral Banner */}
      <div className="bg-gradient-purple mx-4 mt-2 px-4 py-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Gift className="w-6 h-6 text-white" />
          <span className="text-white font-medium">Refer and Earn 30% Discount</span>
        </div>
        <div className="flex items-center space-x-1 text-white">
          <span className="text-sm font-medium">Refer Now</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Zingprime Banner */}
      <div className="bg-gradient-gold mx-4 mt-2 px-4 py-2 rounded-lg">
        <span className="text-black font-medium">
          <strong>zingprime</strong> | UPTO 5% OFF* on 5 zingbus rides 
        </span>
        <ChevronRight className="w-4 h-4 inline ml-1" />
      </div>

      {/* Service Categories */}
      <div className="px-4 mt-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center min-w-[80px]">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${category.color} mb-2`}>
                <span className={`text-xs font-bold ${category.textColor} text-center px-2`}>
                  {category.name.split(' ')[0]}
                </span>
              </div>
              <span className="text-xs text-center text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="mx-4 mt-6 bg-white rounded-lg shadow-card p-4">
        <div className="relative">
          <div className="space-y-3">
            <div className="relative">
              <input 
                type="text"
                value="Delhi"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium"
                placeholder="From City"
              />
            </div>
            <div className="relative">
              <input 
                type="text"
                value="Dehradun"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium"
                placeholder="To City"
              />
            </div>
          </div>
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full">
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="mt-4">
          <span className="text-sm text-gray-500 font-medium">DATE</span>
          <div className="flex items-center mt-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-lg font-semibold mr-4">03 Sep 2025</span>
          </div>
          <div className="flex space-x-2 mb-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
              Today
            </button>
            <button className="px-4 py-2 bg-zingbus-purple text-white rounded-lg text-sm font-medium">
              Tomorrow
            </button>
          </div>
        </div>

        <Button 
          className="w-full bg-zingbus-purple hover:bg-zingbus-purple/90 text-white py-4 text-lg font-semibold rounded-lg"
          onClick={onSearch}
        >
          SEARCH BUSES
        </Button>
      </div>

      {/* Offers Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-900">Offers For You</span>
          <span className="text-zingbus-purple font-medium">View More</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["Follow Us", "ibus", "valuebus", "zingbus SUV", "Payment"].map((tag, index) => (
            <div key={index} className="bg-gray-100 px-3 py-2 rounded-full whitespace-nowrap">
              <span className="text-sm text-gray-700">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Group Booking Banner */}
      <div className="mx-4 mt-4 mb-20 bg-gradient-purple p-4 rounded-lg">
        <div className="text-white">
          <div className="flex items-center mb-2">
            <span className="text-xl font-bold">zingbus</span>
          </div>
          <h3 className="text-lg font-bold mb-1">GROUP</h3>
          <p className="text-sm opacity-90">Get upto 15% OFF on Group Bookings of 3 or more</p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-20 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>

      <BottomNavigation activeTab="home" onTabChange={onTabChange} />
    </div>
  );
};

export default HomeScreen;