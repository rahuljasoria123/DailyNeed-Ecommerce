import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user safely from localStorage
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [user, setUser] = useState(initialUser);

  // -------------------------
  // LOGIN → Save user + token
  // -------------------------
  const login = (userData) => {
    // userData MUST include { username, email, avatar?, token? }
    const updatedUser = {
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar || "",       // default empty
      token: userData.token || "",         // default empty
    };

    setIsLoggedIn(true);
    setUser(updatedUser);

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // -------------------------
  // UPDATE USER INFO (Used by Profile Page)
  // -------------------------
  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateUser, // <-- NEW
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
