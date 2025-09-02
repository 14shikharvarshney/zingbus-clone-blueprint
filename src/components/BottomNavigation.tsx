import { Home, Star, MapPin, Plus, Compass } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation = ({ activeTab }: BottomNavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "zingprime", label: "zingprime", icon: Star },
    { id: "trips", label: "My Trips", icon: MapPin },
    { id: "plus", label: "Plus+", icon: Plus },
    { id: "explore", label: "Explore", icon: Compass }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <div key={tab.id} className="flex flex-col items-center py-1 px-2">
              <Icon 
                className={`w-5 h-5 ${isActive ? 'text-zingbus-purple' : 'text-gray-500'}`} 
              />
              <span className={`text-xs mt-1 ${isActive ? 'text-zingbus-purple' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;