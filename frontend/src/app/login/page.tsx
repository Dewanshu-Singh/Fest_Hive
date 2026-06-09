'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
    console.log('Logging in:', formData);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4 sm:px-6 z-10"
      >
        <div className="glass p-6 sm:p-10 rounded-3xl border border-surface-2 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple to-accent-gold" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Log in to manage your premium events.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 relative group">
              <label className="text-sm font-medium text-gray-400 pl-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-accent-gold transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-surface-1 border border-surface-2 focus:border-accent-gold rounded-xl text-white pl-10 pr-4 py-3 outline-none transition-all placeholder:text-gray-600"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 relative group">
              <div className="flex justify-between items-center pl-1">
                <label className="text-sm font-medium text-gray-400">Password</label>
                <Link href="#" className="text-xs text-accent-gold hover:text-accent-purple transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-accent-gold transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  required
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-surface-1 border border-surface-2 focus:border-accent-gold rounded-xl text-white pl-10 pr-4 py-3 outline-none transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Log In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-surface-2 text-center text-sm">
            <p className="text-gray-400 mb-4">
              Don't have an account?{' '}
              <Link href="/signup" className="text-white font-semibold hover:text-accent-gold transition-colors">
                Sign Up
              </Link>
            </p>
            
            <Link href="/admin/login" className="inline-flex items-center text-xs uppercase tracking-widest text-accent-purple hover:text-accent-gold transition-colors font-semibold">
              <Lock className="w-3 h-3 mr-1" />
              Login as Admin
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
