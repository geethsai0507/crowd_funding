import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">CrowdFund</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/search" className="p-2 rounded-full hover:bg-gray-100">
              <Search className="h-6 w-6 text-gray-600" />
            </Link>
            <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </Link>
            <button
              onClick={onLogout}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}