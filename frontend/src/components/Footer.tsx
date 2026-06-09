'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-2 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-white">
            FEST<span className="text-accent-gold">_HIVE</span>
          </Link>
          <p className="mt-4 text-gray-400 max-w-sm">
            Creating Unforgettable Experiences. The premium event management agency for the modern world.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link href="/#about" className="hover:text-accent-gold transition-colors">About Us</Link></li>
            <li><Link href="/events" className="hover:text-accent-gold transition-colors">Events</Link></li>
            <li><Link href="/#services" className="hover:text-accent-gold transition-colors">Services</Link></li>
            <li><Link href="/#contact" className="hover:text-accent-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Connect</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-accent-purple transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-accent-purple transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-accent-purple transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-accent-purple transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-surface-2 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Fest_Hive. All rights reserved.</p>
      </div>
    </footer>
  );
}
