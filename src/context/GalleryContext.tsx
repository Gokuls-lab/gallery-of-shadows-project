
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Image {
  id: string;
  userId: string;
  url: string;
  title: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

interface GalleryContextType {
  userImages: Image[];
  allImages: Image[];
  userPosts: Post[];
  allPosts: Post[];
  uploadImage: (file: File, title: string) => void;
  createPost: (content: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [allImages, setAllImages] = useState<Image[]>(() => {
    const storedImages = localStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : [];
  });
  
  const [allPosts, setAllPosts] = useState<Post[]>(() => {
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  // Update localStorage when images change
  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(allImages));
  }, [allImages]);

  // Update localStorage when posts change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(allPosts));
  }, [allPosts]);

  // Filter images for the current user
  const userImages = currentUser 
    ? allImages.filter(img => img.userId === currentUser.id)
    : [];

  // Filter posts for the current user
  const userPosts = currentUser 
    ? allPosts.filter(post => post.userId === currentUser.id)
    : [];

  const uploadImage = (file: File, title: string) => {
    if (!currentUser) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const newImage: Image = {
          id: Date.now().toString(),
          userId: currentUser.id,
          url: e.target.result as string,
          title,
          createdAt: new Date().toISOString(),
        };
        setAllImages(prev => [...prev, newImage]);
      }
    };
    reader.readAsDataURL(file);
  };

  const createPost = (content: string) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
    };
    setAllPosts(prev => [...prev, newPost]);
  };

  return (
    <GalleryContext.Provider
      value={{
        userImages,
        allImages,
        userPosts,
        allPosts,
        uploadImage,
        createPost,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
