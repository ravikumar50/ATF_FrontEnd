// src/Components/Auth/AdminRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal, useAccount } from "@azure/msal-react";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { accounts } = useMsal();
  

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const email = accounts[0]?.username;
        
        if (!email) {
          navigate('/denied');
          return;
        }

        const formData = new FormData();
        formData.append('email', email);

        const url = "https://functionapptry.azurewebsites.net/api/isAdmin";

        const response = await fetch(url, {
          method: 'POST',
          body: formData
        });

        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          navigate('/denied');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/denied');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [accounts, navigate]);

  if (isLoading) return <div>Checking permissions...</div>;

  return isAdmin ? children : null;
};

export default AdminRoute;
