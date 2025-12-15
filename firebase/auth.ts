import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

initializeApp(firebaseConfig);
const auth = getAuth();

// ---------------- Auth Context Types ----------------
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

// ---------------- Context ----------------
const AuthContext = createContext<AuthContextType | null>(null);

// ---------------- Provider ----------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authValue = useProvideAuth();
  return React.createElement(
    AuthContext.Provider,
    { value: authValue },
    children
  );
};

// ---------------- Hook to use Auth ----------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// ---------------- Hook to provide Auth logic ----------------
function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err: any) {
      throw new Error(err.message || "Failed to login");
    }
  };

  // Register function
  const register = async (email: string, password: string): Promise<User> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err: any) {
      throw new Error(err.message || "Failed to register");
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err: any) {
      throw new Error(err.message || "Failed to logout");
    }
  };

  return { user, login, register, logout };
}
