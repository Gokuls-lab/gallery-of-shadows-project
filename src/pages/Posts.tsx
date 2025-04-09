
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '@/context/GalleryContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Posts: React.FC = () => {
  const [content, setContent] = useState('');
  const { userPosts, createPost } = useGallery();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim()) {
      createPost(content);
      setContent('');
      toast({
        title: 'Success',
        description: 'Post created successfully',
      });
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Posts</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full min-h-[100px]"
              />
              
              <Button type="submit" className="bg-gallery-primary hover:bg-gallery-secondary">
                Create Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {userPosts.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">You haven't created any posts yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gallery-primary text-white flex items-center justify-center">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{currentUser.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="whitespace-pre-wrap">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
