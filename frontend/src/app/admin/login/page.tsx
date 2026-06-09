'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ passcode: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://fest-hive.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.user?.role === 'admin') {
        alert('Admin Login Successful!');
        router.push('/'); // Replace with /admin/dashboard when built
      } else {
        alert(data.message || 'Invalid Admin Credentials.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden pt-20">
      {/* Background decorations - using a darker, more authoritative red/purple scheme for admin */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4 sm:px-6 z-10"
      >
        <Link href="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to User Login
        </Link>
        
        <div className="glass p-6 sm:p-10 rounded-3xl border border-red-900/30 shadow-[0_0_50px_rgba(220,38,38,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-accent-purple" />
          
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4 border border-red-900/50">
              <ShieldCheck className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm">Authorized personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 relative group">
              <label className="text-sm font-medium text-gray-400 pl-1">Admin Passcode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  required
                  type="password" 
                  name="passcode"
                  value={formData.passcode}
                  onChange={handleChange}
                  className="w-full bg-surface-1 border border-surface-2 focus:border-red-500/50 rounded-xl text-white pl-10 pr-4 py-3 outline-none transition-all placeholder:text-gray-600"
                  placeholder="Enter secure passcode"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              Access Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-surface-2 text-center text-xs text-gray-500">
            Attempts are logged and monitored.
          </div>
        </div>
      </motion.div>
    </main>
  );
}
