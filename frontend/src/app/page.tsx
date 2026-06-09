'use client';

import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import HeroScene from '@/components3d/HeroScene';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroScene />
        
        <div className="z-10 text-center px-4 max-w-5xl mx-auto mt-20 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-2xl"
          >
            Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-purple">Unforgettable</span> Experiences
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            The premium event management agency. We design, produce, and manage high-end corporate events, music festivals, and brand activations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pointer-events-auto px-4"
          >
            <Link href="/events" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] text-center">
              Explore Events
            </Link>
            <Link href="/events" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all transform hover:scale-105 text-center">
              Book an Event
            </Link>
          </motion.div>
        </div>
      </section>

      <About />

      <Services />

      <Contact />
    </main>
  );
}
