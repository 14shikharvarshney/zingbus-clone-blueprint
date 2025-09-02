import { Wifi, Signal, Battery } from "lucide-react";

const StatusBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white text-black text-sm font-medium">
      <div className="text-black font-semibold">
        2:07
      </div>
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-0.5">
          <div className="w-1 h-3 bg-black rounded-sm"></div>
          <div className="w-1 h-3 bg-black rounded-sm"></div>
          <div className="w-1 h-3 bg-black rounded-sm"></div>
          <div className="w-1 h-2 bg-gray-300 rounded-sm"></div>
        </div>
        <Wifi className="w-4 h-4 text-black" />
        <div className="flex items-center">
          <div className="w-6 h-3 border border-black rounded-sm relative">
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black rounded-sm"></div>
          </div>
          <span className="text-xs ml-1">76</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;