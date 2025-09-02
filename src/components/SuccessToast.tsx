import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const SuccessToast = ({ message, isVisible, onClose }: SuccessToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default SuccessToast;