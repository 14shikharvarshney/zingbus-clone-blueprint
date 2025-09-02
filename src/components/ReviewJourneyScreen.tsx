import { useState } from "react";
import { ChevronLeft, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBar from "./StatusBar";

interface ReviewJourneyScreenProps {
  onBack: () => void;
  onProceedToPay: () => void;
}

const ReviewJourneyScreen = ({ onBack, onProceedToPay }: ReviewJourneyScreenProps) => {
  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", age: "", gender: "M" },
    { name: "", age: "", gender: "M" }
  ]);
  const [contactDetails, setContactDetails] = useState({
    email: "",
    phone: "8449159038",
    isTravelling: true
  });
  const [couponCode, setCouponCode] = useState("");
  const [appliedOffers, setAppliedOffers] = useState({
    routepass: true,
    travelProtection: true,
    zingcash: false
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm flex items-center">
        <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer mr-3" onClick={onBack} />
        <h1 className="text-lg font-semibold">Review Journey</h1>
      </div>

      {/* Savings Banner */}
      <div className="bg-yellow-100 mx-4 mt-3 p-3 rounded-lg flex items-center">
        <span className="text-2xl mr-2">🎉</span>
        <span className="text-sm font-medium text-gray-800">
          You are saving ₹484 on this booking
        </span>
      </div>

      <div className="px-4 pb-24">
        {/* Journey Summary */}
        <div className="bg-white rounded-lg shadow-card mt-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-left">
              <p className="text-sm text-gray-500">Wed, 03 Sep</p>
              <p className="text-xl font-bold">10:20 AM</p>
              <p className="font-medium">Delhi</p>
              <p className="text-sm text-gray-500">Dhaula Kuan</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">6h 25m</p>
              <div className="w-16 h-0.5 bg-gray-300"></div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Wed, 03 Sep</p>
              <p className="text-xl font-bold">04:45 PM</p>
              <p className="font-medium">Dehradun</p>
              <p className="text-sm text-gray-500">Mall Of Dehradun</p>
            </div>
          </div>
          
          <div className="bg-zingbus-purple text-white px-2 py-1 rounded text-xs font-medium inline-block">
            Plus+ Narni Electric Seater/Sleeper (2+1)
          </div>
          <button className="text-zingbus-purple text-sm font-medium ml-4">
            View Details
          </button>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-lg shadow-card mt-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Passenger Details</h3>
            <button className="text-zingbus-purple font-medium">Passenger List</button>
          </div>
          
          {passengerDetails.map((passenger, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center space-x-4 mb-2">
                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <input
                  type="text"
                  placeholder="Type Passenger Name"
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  value={passenger.name}
                  onChange={(e) => {
                    const newDetails = [...passengerDetails];
                    newDetails[index].name = e.target.value;
                    setPassengerDetails(newDetails);
                  }}
                />
                <input
                  type="text"
                  placeholder="Age"
                  className="w-16 p-2 border border-gray-300 rounded text-sm text-center"
                  value={passenger.age}
                  onChange={(e) => {
                    const newDetails = [...passengerDetails];
                    newDetails[index].age = e.target.value;
                    setPassengerDetails(newDetails);
                  }}
                />
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button
                    className={`px-3 py-2 text-sm ${passenger.gender === 'M' ? 'bg-zingbus-purple text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => {
                      const newDetails = [...passengerDetails];
                      newDetails[index].gender = 'M';
                      setPassengerDetails(newDetails);
                    }}
                  >
                    M
                  </button>
                  <button
                    className={`px-3 py-2 text-sm ${passenger.gender === 'F' ? 'bg-zingbus-purple text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => {
                      const newDetails = [...passengerDetails];
                      newDetails[index].gender = 'F';
                      setPassengerDetails(newDetails);
                    }}
                  >
                    F
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-card mt-4 p-4">
          <h3 className="font-semibold text-lg mb-4">Contact Details</h3>
          
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={contactDetails.isTravelling}
              onChange={(e) => setContactDetails(prev => ({ ...prev, isTravelling: e.target.checked }))}
              className="w-4 h-4 text-zingbus-purple mr-2"
            />
            <span className="text-sm">I am travelling</span>
          </div>
          
          <input
            type="email"
            placeholder="Enter Email Id"
            className="w-full p-3 border border-gray-300 rounded mb-3"
            value={contactDetails.email}
            onChange={(e) => setContactDetails(prev => ({ ...prev, email: e.target.value }))}
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded"
            value={contactDetails.phone}
            onChange={(e) => setContactDetails(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        {/* Offers For You */}
        <div className="bg-white rounded-lg shadow-card mt-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Offers For You</h3>
            <button className="text-zingbus-purple font-medium">View All Coupons</button>
          </div>
          
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 p-3 border border-gray-300 rounded"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="bg-gray-100 text-gray-600 px-4 py-3 rounded font-medium">
              APPLY
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">JOIN</h4>
                <p className="text-green-600 font-medium">Save ₹79</p>
                <p className="text-sm text-gray-600">Get upto 15% OFF on your First Booking</p>
                <button className="text-zingbus-purple text-sm font-medium mt-1">More Details ⌄</button>
              </div>
              <button className="border border-zingbus-purple text-zingbus-purple px-4 py-2 rounded font-medium">
                APPLY
              </button>
            </div>
          </div>
        </div>

        {/* Special Benefits */}
        <div className="bg-white rounded-lg shadow-card mt-4 p-4">
          <h3 className="font-semibold text-lg mb-4">Special Benefits</h3>
          
          {/* RoutePass */}
          <div className="bg-blue-100 rounded-lg p-3 mb-4 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold inline-block mb-2">
                  ⭐ routepass
                </div>
                <span className="text-xs text-gray-600 ml-2">Just at ₹20</span>
                <p className="text-sm text-gray-700 mb-1">Travel Delhi ⇌ Dehradun often?</p>
                <h4 className="font-bold text-lg">Wohoo! Grab Seats @₹249</h4>
                <p className="text-xs text-gray-600">Save up to ₹450 per seat for the next 6 months</p>
                <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs mt-2 inline-block">
                  💰 Saving ₹484 on this trip
                </div>
                <button className="text-blue-600 text-xs ml-2">Know More ⌄</button>
              </div>
              <button className="text-red-600 border border-red-600 px-3 py-1 rounded text-sm">
                Remove
              </button>
            </div>
          </div>

          {/* Travel Protection */}
          <div className="flex items-start space-x-3 mb-4 p-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">🛡️</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Travel Protection</h4>
              <p className="text-sm text-gray-600">Insure your ride for just ₹20</p>
              <button className="text-zingbus-purple text-sm font-medium">More Details</button>
            </div>
            <input
              type="checkbox"
              checked={appliedOffers.travelProtection}
              onChange={(e) => setAppliedOffers(prev => ({ ...prev, travelProtection: e.target.checked }))}
              className="w-5 h-5 text-zingbus-purple"
            />
          </div>

          {/* Redeem Zingcash */}
          <div className="flex items-start space-x-3 p-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600">🪙</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Redeem zingcash!</h4>
              <p className="text-sm text-gray-600">Balance: <span className="text-yellow-600">200 zingcash</span></p>
              <p className="text-xs text-gray-500">Get 10% zingcash reward on completing every trip with us.</p>
            </div>
            <input
              type="checkbox"
              checked={appliedOffers.zingcash}
              onChange={(e) => setAppliedOffers(prev => ({ ...prev, zingcash: e.target.checked }))}
              className="w-5 h-5 text-zingbus-purple"
            />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="font-medium">Net Amount</span>
              <Info className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <div className="text-xl font-bold">₹ 656</div>
            <div className="text-sm text-gray-500">for 2 seats</div>
          </div>
          <Button className="bg-zingbus-purple hover:bg-zingbus-purple/90 text-white px-8 py-3 rounded-lg font-medium" onClick={onProceedToPay}>
            PROCEED TO PAY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewJourneyScreen;