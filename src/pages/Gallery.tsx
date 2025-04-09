
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '@/context/GalleryContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';

const Gallery: React.FC = () => {
  const { userImages } = useGallery();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Gallery</h1>
      
      {userImages.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">You haven't uploaded any images yet.</p>
          <a href="/upload" className="text-gallery-primary hover:underline mt-4 inline-block">
            Upload your first image
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative pb-[100%]">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{image.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
