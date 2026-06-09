'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Signup logic here
    console.log('Signing up:', formData);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-gold/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4 sm:px-6 z-10 my-12"
      >
        <div className="glass p-6 sm:p-10 rounded-3xl border border-surface-2 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold to-accent-purple" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Join Fest_Hive</h1>
            <p className="text-gray-400">Create an account to book and manage events.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 relative group">
              <label className="text-sm font-medium text-gray-400 pl-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-accent-gold transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-surface-1 border border-surface-2 focus:border-accent-gold rounded-xl text-white pl-10 pr-4 py-3 outline-none transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              <label className="text-sm font-medium text-gray-400 pl-1">Password</label>
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
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform hover:scale-[1.02] mt-8 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-surface-2 text-center text-sm">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-white font-semibold hover:text-accent-gold transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
