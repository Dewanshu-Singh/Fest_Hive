'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, ArrowUpRight, X, Ticket } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';

const fakeEvents = [
  {
    id: 1,
    title: 'Nexus Global Tech Summit 2026',
    date: 'Oct 15 - 18, 2026',
    location: 'Moscone Center, San Francisco',
    category: 'Conference',
    image: '/images/tech_conference.png',
    desc: 'The premier gathering of global tech leaders, featuring groundbreaking keynotes, product launches, and exclusive networking.',
    longDesc: 'Join thousands of innovators, engineers, and tech enthusiasts at the Nexus Global Tech Summit. Over three days, experience hands-on workshops, visionary keynotes from industry titans, and unparalleled networking opportunities. Discover the future of AI, quantum computing, and sustainable tech infrastructure.',
  },
  {
    id: 2,
    title: 'Aurora Music Festival',
    date: 'Dec 05 - 07, 2026',
    location: 'Desert Valley, Nevada',
    category: 'Music Festival',
    image: '/images/festival_stage.png',
    desc: 'A three-day immersive audio-visual experience in the desert, bringing together top EDM and alternative artists.',
    longDesc: 'Aurora is more than a music festival; it is a temporary utopian city built in the heart of the desert. Featuring world-renowned DJs, massive interactive art installations, and a community of music lovers. Prepare for breathtaking laser shows, sunset sessions, and dancing under the stars.',
  },
  {
    id: 3,
    title: 'Vanguard Luxury Gala',
    date: 'Nov 22, 2026',
    location: 'The Plaza, New York',
    category: 'Corporate Gala',
    image: '/images/luxury_gala.png',
    desc: 'An exclusive black-tie charity gala featuring a five-course dinner, live auction, and performances by renowned artists.',
    longDesc: 'The Vanguard Luxury Gala is the social event of the season. Walk the red carpet into the historic Plaza Hotel for an evening of unmatched elegance. Enjoy a curated menu by Michelin-starred chefs, a private art auction, and a surprise performance by a Grammy-winning artist. Dress code is strictly black tie.',
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof fakeEvents[0] | null>(null);
  const lenis = useLenis();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (lenis) lenis.start();
    };
  }, [selectedEvent, lenis]);

  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-purple">Events</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Discover the extraordinary experiences we are bringing to life. Secure your tickets to the most anticipated events of the year.
            </p>
          </motion.div>

          <div className="space-y-12">
            {fakeEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass p-6 md:p-8 rounded-3xl group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-full md:w-2/5 h-64 md:h-80 rounded-2xl overflow-hidden shrink-0">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 glass px-4 py-1 rounded-full text-sm font-semibold text-white">
                    {event.category}
                  </div>
                </div>
                
                <div className="w-full md:w-3/5 space-y-6 z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-accent-gold transition-colors duration-300">
                    {event.title}
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent-purple" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-accent-purple" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {event.desc}
                  </p>
                  
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-accent-gold hover:text-white transition-all duration-300 transform group-hover:translate-x-2"
                  >
                    View Details
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Expanded Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Blurred Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedEvent(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass border border-surface-2 rounded-3xl shadow-2xl flex flex-col"
              data-lenis-prevent="true"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-64 sm:h-80 shrink-0">
                <Image 
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-accent-purple/80 backdrop-blur-md rounded-full text-xs font-semibold text-white uppercase tracking-wider mb-3 inline-block">
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-10 bg-[#0a0a0a]">
                <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-surface-2">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-accent-gold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-white">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-accent-gold">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-white">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-bold text-white mb-4">About the Event</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {selectedEvent.longDesc}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link 
                    href={`/book/${selectedEvent.id}`}
                    className="flex items-center gap-2 px-8 py-4 bg-accent-gold text-black font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    <Ticket className="w-5 h-5" />
                    Book Tickets Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
