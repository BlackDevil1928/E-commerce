
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the return URL from location state or default to home
  const from = location.state?.from?.pathname || "/";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password);
      
      // Navigate to the page the user was trying to access, or home if they came directly to login
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      // Error is already handled in auth context with toast
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h1 className="text-2xl font-bold">Log in to your account</h1>
          <p className="text-gray-600 mt-2">
            Enter your email and password to access your account
          </p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] transition-all duration-300"
              placeholder="you@example.com"
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[hsl(var(--brand))] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))] transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[hsl(var(--brand))] border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              className="w-full btn-brand flex justify-center items-center transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </motion.div>
        </form>
        
        <motion.div 
          className="mt-6 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[hsl(var(--brand))] hover:underline transition-colors duration-300">
              Create an account
            </Link>
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-8 border-t pt-6"
          variants={itemVariants}
        >
          <div className="text-center mb-4">
            <span className="text-sm text-gray-500">Demo User Credentials</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <motion.button
              onClick={() => {
                setEmail("user@example.com");
                setPassword("password123");
              }}
              className="flex-1 btn-outline text-sm py-1 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              User Demo
            </motion.button>
            <motion.button
              onClick={() => {
                setEmail("admin@example.com");
                setPassword("password123");
              }}
              className="flex-1 btn-outline text-sm py-1 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Admin Demo
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
