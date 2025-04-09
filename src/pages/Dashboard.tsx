
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useGallery } from '@/context/GalleryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { userImages, userPosts } = useGallery();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have {userImages.length} image(s) in your gallery.</p>
            <Link to="/gallery" className="text-gallery-primary hover:underline">View Gallery</Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have {userPosts.length} post(s).</p>
            <Link to="/posts" className="text-gallery-primary hover:underline">View Posts</Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload an Image</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Share a new image with your gallery.</p>
            <Link to="/upload" className="text-gallery-primary hover:underline">Upload Image</Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">View or update your profile information.</p>
            <Link to="/profile" className="text-gallery-primary hover:underline">Go to Profile</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
