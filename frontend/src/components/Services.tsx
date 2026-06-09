'use client';

import { motion } from 'framer-motion';
import { Music, Briefcase, Building, MapPin, Users, Heart } from 'lucide-react';

const services = [
  { id: 1, title: 'Corporate Events', icon: <Briefcase className="w-8 h-8" />, desc: 'High-end conferences, product launches, and gala dinners.' },
  { id: 2, title: 'Music Festivals', icon: <Music className="w-8 h-8" />, desc: 'Large scale outdoor music festivals with world-class production.' },
  { id: 3, title: 'Brand Activations', icon: <Building className="w-8 h-8" />, desc: 'Immersive pop-ups and experiential marketing events.' },
  { id: 4, title: 'College Fests', icon: <Users className="w-8 h-8" />, desc: 'Energetic and culturally rich campus festivals.' },
  { id: 5, title: 'Weddings', icon: <Heart className="w-8 h-8" />, desc: 'Luxury destination weddings and premium celebrations.' },
  { id: 6, title: 'Conferences', icon: <MapPin className="w-8 h-8" />, desc: 'Global summits with flawless execution and logistics.' },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#0a0a0a] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-16 text-white text-center"
        >
          Our <span className="text-accent-gold">Expertise</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-6 sm:p-8 rounded-3xl group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="bg-surface-2 w-16 h-16 rounded-2xl flex items-center justify-center text-accent-gold mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
              
              <div className="mt-8 flex items-center text-accent-gold font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                Learn More <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
