import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const Header = ({ onMobileMenuClick }) => {
  const { user } = useAuth();
  const { settings } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const toggleNotifications = () => {
    if (!settings?.notifications) {
      return;
    }
    setShowNotifications((prev) => !prev);
  };

  const notificationItems = [
    { id: 1, title: 'Welcome back!', message: 'Your profile settings are loaded.' },
    { id: 2, title: 'Habit reminder', message: 'You have a habit due today.' }
  ];

  const avatarDisplay = user?.avatar || user?.username?.charAt(0).toUpperCase() || '👤';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onMobileMenuClick}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label="Open navigation"
          >
            <span className="text-2xl">☰</span>
          </button>

          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotifications}
              className={`relative p-2 ${settings.notifications ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
              aria-label="Notifications"
            >
              <span className="text-lg">🔔</span>
              {settings.notifications && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {showNotifications && settings.notifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notificationItems.map((item) => (
                    <div key={item.id} className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {avatarDisplay}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
