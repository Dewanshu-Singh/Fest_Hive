'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Monitor, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock event data to show dynamic loading (in a real app, fetch by ID)
const events = {
  '1': { title: 'Nexus Global Tech Summit 2026', price: 5000 },
  '2': { title: 'Aurora Music Festival', price: 3500 },
  '3': { title: 'Vanguard Luxury Gala', price: 15000 },
};

// Generate a 10x15 seating grid with some randomly "booked" seats
const ROWS = 8;
const COLS = 12;

const initialSeats = Array.from({ length: ROWS * COLS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const isBooked = Math.random() < 0.2; // 20% chance a seat is already booked
  return {
    id: `${String.fromCharCode(65 + row)}${col + 1}`,
    status: isBooked ? 'booked' : 'available' as 'available' | 'booked' | 'selected',
  };
});

export default function BookingPage() {
  const params = useParams();
  const eventId = typeof params.id === 'string' ? params.id : '1';
  const event = events[eventId as keyof typeof events] || events['1'];
  
  const [seats, setSeats] = useState(initialSeats);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedSeats = seats.filter(s => s.status === 'selected');
  const totalPrice = selectedSeats.length * event.price;

  const toggleSeat = (id: string) => {
    setSeats(current => 
      current.map(seat => {
        if (seat.id === id) {
          if (seat.status === 'booked') return seat; // Can't select booked
          return {
            ...seat,
            status: seat.status === 'available' ? 'selected' : 'available'
          };
        }
        return seat;
      })
    );
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    setIsCheckingOut(true);
    // Simulate network request
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-3xl max-w-lg w-full text-center border border-accent-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
        >
          <div className="w-20 h-20 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent-gold" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-8 text-lg">
            You have successfully booked {selectedSeats.length} ticket(s) for <strong className="text-white">{event.title}</strong>.
            A confirmation email has been sent to you.
          </p>
          <Link 
            href="/events"
            className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Back to Events
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Link href="/events" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Seating Chart Area */}
          <div className="flex-1 glass p-6 sm:p-10 rounded-3xl border border-surface-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Select Your Seats</h2>
              <p className="text-gray-400 text-sm">Click on available seats to add them to your selection.</p>
            </div>

            {/* Stage */}
            <div className="w-full max-w-2xl mx-auto mb-16 relative">
              <div className="h-16 w-full bg-gradient-to-t from-surface-2 to-transparent rounded-t-full flex items-end justify-center pb-2 border-b-4 border-accent-purple/50 shadow-[0_10px_30px_rgba(168,85,247,0.2)]">
                <div className="flex items-center gap-2 text-gray-500 text-sm uppercase tracking-widest font-semibold">
                  <Monitor className="w-4 h-4" /> Stage
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="max-w-3xl mx-auto overflow-x-auto pb-6">
              <div 
                className="grid gap-2 sm:gap-3 mx-auto min-w-max" 
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
              >
                {seats.map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={seat.status === 'available' ? { scale: 1.15 } : {}}
                    whileTap={seat.status !== 'booked' ? { scale: 0.9 } : {}}
                    onClick={() => toggleSeat(seat.id)}
                    disabled={seat.status === 'booked'}
                    className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-sm text-[10px] sm:text-xs font-bold transition-colors
                      flex items-center justify-center cursor-pointer shadow-sm relative overflow-hidden
                      ${seat.status === 'available' ? 'bg-surface-2 text-gray-400 hover:bg-surface-2 hover:border-accent-gold border border-transparent' : ''}
                      ${seat.status === 'selected' ? 'bg-accent-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : ''}
                      ${seat.status === 'booked' ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50' : ''}
                    `}
                    title={`Seat ${seat.id}`}
                  >
                    {seat.status === 'selected' && <span className="absolute inset-0 bg-white/20 animate-pulse" />}
                    {seat.id}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-surface-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-surface-2 border border-transparent" />
                <span className="text-sm text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                <span className="text-sm text-gray-400">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gray-800 opacity-50" />
                <span className="text-sm text-gray-400">Booked</span>
              </div>
            </div>
          </div>

          {/* Checkout Panel */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="glass p-8 rounded-3xl border border-surface-2 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-surface-2">Booking Summary</h3>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Event</p>
                <p className="text-white font-semibold">{event.title}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2 flex items-center justify-between">
                  Selected Seats 
                  <span className="text-accent-gold font-bold bg-accent-gold/10 px-2 py-0.5 rounded text-xs">
                    {selectedSeats.length}
                  </span>
                </p>
                {selectedSeats.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(s => (
                      <span key={s.id} className="text-sm font-medium text-black bg-white px-2 py-1 rounded">
                        {s.id}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm italic">No seats selected yet</p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Price per ticket</span>
                  <span>₹{event.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Taxes & Fees (18% GST)</span>
                  <span>₹{Math.floor(totalPrice * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="h-px w-full bg-surface-2 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-accent-gold">
                    ₹{Math.floor(totalPrice * 1.18).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedSeats.length === 0 || isCheckingOut}
                className="w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                  disabled:bg-surface-2 disabled:text-gray-500 disabled:cursor-not-allowed
                  bg-accent-gold text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                "
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${Math.floor(totalPrice * 1.18).toLocaleString('en-IN')}`
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                By proceeding to pay, you agree to our terms of service and cancellation policy. All sales are final.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
