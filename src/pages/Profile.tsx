
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!currentUser) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="font-medium">Username:</span>
              <span>{currentUser.username}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="font-medium">Email:</span>
              <span>{currentUser.email}</span>
            </div>
            
            <div className="pt-4">
              <Link to="/change-password">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
