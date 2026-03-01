import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    login();
    navigate('/home');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-background">
      <div className="px-5 pt-12">
        <button onClick={() => navigate(-1)} className="mb-6 p-2 -ml-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-extrabold text-foreground mb-1">
            {mode === 'login' ? 'Welcome back! 👋' : 'Join us! 🎉'}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {mode === 'login'
              ? 'Sign in to access your products and rewards'
              : 'Save your products, rewards, and preferences'}
          </p>

          <div className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-card border border-border rounded-xl py-3.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-card border border-border rounded-xl py-3.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full bg-card border border-border rounded-xl py-3.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>

            {mode === 'register' && (
              <label className="flex items-start gap-2 px-1">
                <input type="checkbox" className="mt-1 rounded border-border" />
                <span className="text-xs text-muted-foreground">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-accent text-accent-foreground font-display font-bold py-3.5 rounded-xl text-sm shadow-md hover:opacity-90 transition-opacity"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex gap-3">
              <button onClick={handleSubmit} className="flex-1 bg-card border border-border rounded-xl py-3 text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                🍎 Apple
              </button>
              <button onClick={handleSubmit} className="flex-1 bg-card border border-border rounded-xl py-3 text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                🔵 Google
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-accent font-semibold">
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
