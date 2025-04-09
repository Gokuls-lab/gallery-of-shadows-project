
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gallery-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Gallery of Shadows</Link>
        
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>
              <Link to="/upload" className="text-white hover:text-gray-200">Upload</Link>
              <Link to="/gallery" className="text-white hover:text-gray-200">Gallery</Link>
              <Link to="/posts" className="text-white hover:text-gray-200">Posts</Link>
              <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
              <Button variant="outline" onClick={logout} className="text-white border-white hover:bg-gallery-secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
