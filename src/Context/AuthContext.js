import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext, useEffect } from "react";
import { auth } from "../Firebase/firebase";

const AuthContext = createContext({
  user: {},
  isAuthenticated: Boolean,
  userLoading: Boolean,
  setUserLoading: Function,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLoading, setUserLoading] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, userLoading, setUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
