import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { setShowProfileEdit, setShowSettings } = useData();
  const avatarDisplay = user?.avatar || user?.username?.charAt(0).toUpperCase() || '👤';

  const handleSignOut = () => {
    logout();
  };

  const handleProfileClick = () => {
    setShowProfileEdit(true);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Habit Tracker', href: '/dashboard/habits', icon: '🎯' },
    { name: 'RoomMate', href: '/dashboard/roommate', icon: '👥' },
    { name: 'SecretCircle', href: '/dashboard/secrets', icon: '💭' },
    { name: 'MoodMirror', href: '/dashboard/mood', icon: '🌈' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between h-16 px-4 bg-blue-600 md:justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">C</span>
          </div>
          <span className="text-white text-xl font-bold">Cohabify</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-blue-500 md:hidden"
          aria-label="Close navigation"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <button 
            onClick={handleProfileClick}
            className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
          >
            <span className="text-blue-600 font-medium text-sm">
              {avatarDisplay}
            </span>
          </button>
          <div className="flex-1">
            <button 
              onClick={handleProfileClick}
              className="text-left hover:text-blue-600 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSettingsClick}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 text-center"
          >
            Settings
          </button>
          <button 
            onClick={handleSignOut}
            className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
