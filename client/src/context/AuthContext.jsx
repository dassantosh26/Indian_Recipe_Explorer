/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if the token has expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log("Token has expired. Logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setUser(null);
        } else {
          setUser({ ...decodedToken, username });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
    }
    setLoading(false);
  }, []);

  //Login function to store username in localStorage
  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    const decodedToken = jwtDecode(token);
    setUser({ ...decodedToken, username });
    // console.log("User after login:", { ...decodedToken, username });
  };

  // Logout function to remove username from localStorage and redirect
  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    if (navigate) {
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

