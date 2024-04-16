// src/components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${URL}/api/auth/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          const { isAuthenticated, user } = await response.json();
          console.log("protected route", user)

          setIsAuthenticated(isAuthenticated);
          console.log(user)
          setUser(user);
          setIsLoading(false);
        } else {
          setIsAuthenticated(isAuthenticated);
          setIsLoading(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, user };
};

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={user} />; // If authenticated, continue rendering the component the route is pointing to
};

export default ProtectedRoute;
