import { useState } from "react";
import { ChevronLeft, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoardingPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

interface BoardingPoint {
  id: string;
  name: string;
  time: string;
  address?: string;
}

const BoardingPointModal = ({ isOpen, onClose, onContinue }: BoardingPointModalProps) => {
  const [selectedPoint, setSelectedPoint] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'boarding' | 'drop'>('boarding');

  const boardingPoints: BoardingPoint[] = [
    { id: '1', name: 'Dhaula Kuan', time: '10:20 AM' },
    { id: '2', name: 'Jhandewalan Metro Station', time: '10:45 AM' },
    { id: '3', name: 'Kashmere Gate ISBT', time: '11:10 AM' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl min-h-[70vh] flex flex-col">
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

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'boarding'
                ? 'text-zingbus-purple border-b-2 border-zingbus-purple'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('boarding')}
          >
            BOARDING POINT
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'drop'
                ? 'text-zingbus-purple border-b-2 border-zingbus-purple'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('drop')}
          >
            DROP POINT
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Nearest Point Suggestion */}
          <div className="bg-zingbus-purple-light p-3 rounded-lg mb-4 flex items-center">
            <span className="text-zingbus-purple text-sm font-medium flex-1">
              Select Nearest Boarding Point according to your current location
            </span>
            <span className="text-zingbus-purple">›</span>
          </div>

          {/* Boarding Points List */}
          <div className="space-y-0">
            {boardingPoints.map((point) => (
              <div
                key={point.id}
                className="py-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{point.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{point.time}</p>
                    <button className="flex items-center text-zingbus-purple text-sm font-medium">
                      <Navigation className="w-4 h-4 mr-1" />
                      Navigate on Maps
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="boardingPoint"
                      value={point.id}
                      checked={selectedPoint === point.id}
                      onChange={(e) => setSelectedPoint(e.target.value)}
                      className="w-5 h-5 text-zingbus-purple"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-4 border-t">
          <Button
            className="w-full bg-zingbus-purple hover:bg-zingbus-purple/90 text-white py-3 rounded-lg font-medium"
            onClick={onContinue}
            disabled={!selectedPoint}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoardingPointModal;