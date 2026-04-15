import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface Notification {
  id: number;
  name: string;
  city: string;
  timeAgo: string;
}

const NotificationPopup = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const mockRegistrations = [
    { name: "Priya S.", city: "Mumbai", timeAgo: "just now" },
    { name: "Rahul K.", city: "Delhi", timeAgo: "2 minutes ago" },
    { name: "Sneha M.", city: "Bangalore", timeAgo: "3 minutes ago" },
    { name: "Arjun P.", city: "Chennai", timeAgo: "5 minutes ago" },
    { name: "Kavita R.", city: "Pune", timeAgo: "7 minutes ago" },
    { name: "Vikram S.", city: "Hyderabad", timeAgo: "9 minutes ago" },
    { name: "Anita D.", city: "Kolkata", timeAgo: "11 minutes ago" },
    { name: "Rohan B.", city: "Ahmedabad", timeAgo: "13 minutes ago" },
    { name: "Meera J.", city: "Jaipur", timeAgo: "15 minutes ago" },
    { name: "Sanjay T.", city: "Lucknow", timeAgo: "17 minutes ago" },
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = mockRegistrations[Math.floor(Math.random() * mockRegistrations.length)];
      const notification = {
        ...randomNotification,
        id: Date.now()
      };
      
      setCurrentNotification(notification);
      
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    };

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(showNotification, 5000);
    
    // Then show notifications every 15-25 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 10000 + 15000; // 15-25 seconds
      setTimeout(showNotification, randomDelay);
    }, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div className="fixed top-4 left-4 z-50 animate-slide-in-left max-w-xs">
      <div className="bg-white rounded-lg shadow-xl border border-purple-200 p-3">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm truncate">
              {currentNotification.name} from {currentNotification.city}
            </div>
            <div className="text-purple-600 text-xs mt-1">
              registered for Authorverse Summit
            </div>
            <div className="text-gray-500 text-xs">
              {currentNotification.timeAgo}
            </div>
          </div>
          <button 
            onClick={() => setCurrentNotification(null)}
            className="text-gray-400 hover:text-purple-600 p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup; 