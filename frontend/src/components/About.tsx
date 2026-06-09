'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = ({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(progressRatio * end));
      
      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    if (inView) {
      animationFrameId = requestAnimationFrame(animateCount);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, inView]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-accent-gold">
      {count}{suffix}
    </div>
  );
};

export default function About() {
  return (
    <section id="about" className="py-32 bg-background relative z-10 border-t border-surface-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white"><span className="text-accent-gold">/</span> The Story of Fest_Hive</h2>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            We don't just organize events; we engineer unforgettable moments. For over a decade, Fest_Hive has been the silent architect behind the world's most spectacular gatherings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl relative group">
              <div className="absolute inset-0 bg-accent-purple/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl font-bold text-white mb-4">Precision Meets Imagination</h3>
              <p className="text-gray-300 leading-relaxed">
                Our philosophy is simple: every detail matters. From the grandiose lighting design of a main stage to the subtle centerpiece at a luxury gala, we blend surgical precision with boundless creativity. We partner with elite brands, visionaries, and artists to translate bold ideas into breathtaking realities.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="glass p-4 sm:p-6 rounded-2xl text-center">
                <Counter end={500} suffix="+" />
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-2">Events Managed</p>
              </div>
              <div className="glass p-4 sm:p-6 rounded-2xl text-center">
                <Counter end={100} suffix="%" />
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-2">Happy Clients</p>
              </div>
              <div className="glass p-4 sm:p-6 rounded-2xl text-center">
                <Counter end={25} suffix="+" />
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-2">Cities Covered</p>
              </div>
              <div className="glass p-4 sm:p-6 rounded-2xl text-center">
                <Counter end={12} suffix="+" />
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mt-2">Years Exp.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 grid grid-rows-2 gap-4">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image 
                  src="/images/luxury_gala.png" 
                  alt="Luxury Gala Event" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image 
                  src="/images/festival_stage.png" 
                  alt="Music Festival Stage" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 delay-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
