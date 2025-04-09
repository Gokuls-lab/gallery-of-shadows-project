
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '@/context/GalleryContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { uploadImage } = useGallery();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (file && title) {
      uploadImage(file, title);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
      navigate('/gallery');
    } else {
      toast({
        title: 'Error',
        description: 'Please select a file and provide a title',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upload an Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">Image Title</label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter image title"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium">Select Image</label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img src={previewUrl} alt="Preview" className="max-w-full h-auto max-h-64 rounded" />
                </div>
              )}
              
              <Button type="submit" className="w-full bg-gallery-primary hover:bg-gallery-secondary">
                Upload Image
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
