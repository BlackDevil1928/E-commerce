
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user storage - in a real app, this would be in a database
  const [registeredUsers, setRegisteredUsers] = useState<{[email: string]: {name: string, password: string, role: "user" | "admin"}}>(
    JSON.parse(localStorage.getItem("registeredUsers") || "{}") 
  );

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Initialize with demo users if empty
    if (Object.keys(registeredUsers).length === 0) {
      const initialUsers = {
        "user@example.com": { 
          name: "Demo User", 
          password: "password123", 
          role: "user" as const 
        },
        "admin@example.com": { 
          name: "Demo Admin", 
          password: "password123", 
          role: "admin" as const 
        }
      };
      setRegisteredUsers(initialUsers);
      localStorage.setItem("registeredUsers", JSON.stringify(initialUsers));
    }
  }, [registeredUsers]);

  // Updated login functionality - now checks against registered users
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Invalid email format");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Check if user exists and password is correct
      const userRecord = registeredUsers[email];
      if (!userRecord) {
        throw new Error("No account found with this email. Please register first.");
      }
      
      if (userRecord.password !== password) {
        throw new Error("Incorrect password");
      }
      
      // Create a user session
      const mockUser = {
        id: `user-${Date.now()}`,
        name: userRecord.name,
        email,
        role: userRecord.role,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Login successful", {
        duration: 3000,
        className: "animate-slideIn"
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed", {
        duration: 3000,
        className: "animate-slideIn"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Updated register functionality - now stores new users
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!name || name.length < 2) {
        throw new Error("Name is required and must be at least 2 characters");
      }
      
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Invalid email format");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Check if user already exists
      if (registeredUsers[email]) {
        throw new Error("An account with this email already exists");
      }
      
      // Create a new user record
      const updatedUsers = {
        ...registeredUsers,
        [email]: {
          name,
          password,
          role: "user" as const,
        }
      };
      
      // Save to our "database"
      setRegisteredUsers(updatedUsers);
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      
      // Create a user session
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user" as const,
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Account created successfully", {
        duration: 3000,
        className: "animate-slideIn"
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed", {
        duration: 3000,
        className: "animate-slideIn"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully", {
      duration: 3000,
      className: "animate-slideIn"
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
