
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gallery-background to-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Gallery of Shadows</h1>
        <p className="text-xl mb-10 max-w-2xl">
          A place to store and share your images securely.
          Create an account today to start uploading your photos!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <>
              <Button asChild className="bg-gallery-primary hover:bg-gallery-secondary">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/upload">Upload an Image</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="bg-gallery-primary hover:bg-gallery-secondary">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Personal Gallery</h2>
            <p className="text-gray-600 mb-4">
              Upload and organize your images in your own personal gallery.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Create Posts</h2>
            <p className="text-gray-600 mb-4">
              Share your thoughts and updates with text posts.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">Secure Account</h2>
            <p className="text-gray-600 mb-4">
              Manage your profile and change your password at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
