'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = ['Home', 'About', 'Events', 'Services', 'Contact'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.85)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBackground, borderBottomColor: navBorder }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 backdrop-blur-md border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-white group z-[60]" onClick={() => setIsMobileMenuOpen(false)}>
            FEST<span className="text-accent-gold group-hover:text-accent-purple transition-colors duration-300">_HIVE</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : item === 'Events' ? '/events' : `/#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent-gold transition-all group-hover:w-full duration-300" />
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-surface-2 ml-4">
              <Link href="/login" className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-6 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 text-sm uppercase tracking-widest font-semibold">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2 z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8 w-full px-6">
              {navItems.map((item) => (
                <motion.div key={item} variants={itemVariants}>
                  <Link 
                    href={item === 'Home' ? '/' : item === 'Events' ? '/events' : `/#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl sm:text-4xl font-bold uppercase tracking-widest text-white hover:text-accent-gold transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={itemVariants} className="w-full max-w-xs h-px bg-surface-2 my-4" />
              
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6 w-full">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full max-w-xs py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all text-center text-lg uppercase tracking-widest font-bold"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
            
            {/* Decorative blurs for mobile menu */}
            <div className="absolute top-20 right-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-accent-gold/20 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
