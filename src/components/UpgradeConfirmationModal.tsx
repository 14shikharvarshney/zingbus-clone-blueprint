import { ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpgradeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
  currentSeat: string;
  newSeat: string;
  upgradeFee: number;
}

const UpgradeConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirmPayment, 
  currentSeat, 
  newSeat, 
  upgradeFee 
}: UpgradeConfirmationModalProps) => {
  if (!isOpen) return null;

  const getSeatType = (seatId: string) => {
    // Determine seat type based on seat ID patterns
    if (seatId.startsWith('1')) return 'Single Sleeper';
    if (seatId.startsWith('2A') || seatId.startsWith('4A')) return 'Window Seat';
    return 'Premium Seat';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl min-h-[50vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer" onClick={onClose} />
          <h2 className="text-lg font-semibold">Confirm Your Upgrade</h2>
          <div className="w-6"></div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Trip Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Trip Details</h3>
            <div className="text-sm text-gray-600">
              <p>Delhi → Dehradun</p>
              <p>Wed, 03 Sep | 10:20 AM</p>
              <p>Plus+ Narni Electric Seater/Sleeper (2+1)</p>
            </div>
          </div>

          {/* Seat Change Summary */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Seat Upgrade Summary</h3>
            
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 border-2 border-blue-500 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-blue-700 font-bold text-sm">{currentSeat}</span>
                </div>
                <p className="text-xs text-gray-600">Current Seat</p>
                <p className="text-xs text-gray-500">Standard</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-zingbus-purple" />
              
              <div className="text-center">
                <div className="w-12 h-12 bg-zingbus-green rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-sm">{newSeat}</span>
                </div>
                <p className="text-xs text-gray-600">New Seat</p>
                <p className="text-xs text-gray-500">{getSeatType(newSeat)}</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Upgrade Benefits</h3>
            <div className="space-y-2">
              {getSeatType(newSeat) === 'Single Sleeper' && (
                <>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Extra privacy with single sleeper berth
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    More comfortable sleeping space
                  </div>
                </>
              )}
              {getSeatType(newSeat) === 'Window Seat' && (
                <>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Beautiful window view during travel
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Better natural lighting
                  </div>
                </>
              )}
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Priority boarding assistance
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-zingbus-purple-light rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Upgrade Fee</span>
              <span className="text-xl font-bold text-zingbus-purple">₹{upgradeFee}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              * Payment will be processed securely
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-4 border-t">
          <Button
            className="w-full bg-zingbus-purple hover:bg-zingbus-purple/90 text-white py-4 text-lg font-semibold rounded-lg"
            onClick={onConfirmPayment}
          >
            Pay ₹{upgradeFee} & Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeConfirmationModal;