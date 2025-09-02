import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBar from "./StatusBar";
import BottomNavigation from "./BottomNavigation";
import { Trip } from "@/types/trip";

interface MyTripsScreenProps {
  onViewUpgrades: (tripId: string) => void;
  trips: Trip[];
  onTabChange?: (tab: string) => void;
}

const MyTripsScreen = ({ onViewUpgrades, trips, onTabChange }: MyTripsScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <h1 className="text-lg font-semibold text-center">My Trips</h1>
      </div>

      {/* Trips List */}
      <div className="flex-1 px-4 py-4 pb-20">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-card mb-4 overflow-hidden">
            {/* Trip Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{trip.route}</h3>
                  <p className="text-sm text-gray-600">{trip.date} | {trip.time}</p>
                </div>
                <div className="text-right">
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {trip.status}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>PNR:</span>
                  <span className="font-medium">{trip.pnr}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bus Type:</span>
                  <span className="font-medium">{trip.busType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat:</span>
                  <span className="font-medium">{trip.seatNumber}</span>
                </div>
              </div>
            </div>

            {/* Upgrade Banner */}
            {trip.hasUpgradeOption && (
              <div className="bg-gradient-purple p-4 text-white relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="pr-8">
                  <h4 className="font-semibold text-lg mb-1">A better seat is available!</h4>
                  <p className="text-sm opacity-90 mb-3">
                    Upgrade to a window seat or a single sleeper.
                  </p>
                  <Button
                    className="bg-white text-zingbus-purple hover:bg-gray-100 font-medium px-4 py-2 rounded-lg flex items-center"
                    onClick={() => onViewUpgrades(trip.id)}
                  >
                    View Upgrades
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Trip Actions */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-3">
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                  View Details
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                  Download Ticket
                </button>
              </div>
            </div>
          </div>
        ))}

        {trips.length === 0 && (
          <div className="text-center mt-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎫</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No trips yet</h3>
            <p className="text-gray-600">Your booked trips will appear here</p>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="trips" onTabChange={onTabChange} />
    </div>
  );
};

export default MyTripsScreen;