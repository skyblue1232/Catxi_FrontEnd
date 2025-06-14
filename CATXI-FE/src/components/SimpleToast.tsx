import { useEffect } from "react";

interface Props {
  message: string;
  duration?: number;
  onClose: () => void;
}

const SimpleToast = ({ message, duration = 2000, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#424242]/60 text-white px-4 py-2 rounded-2xl shadow z-50">
      {message}
    </div>
  );
};

export default SimpleToast;
