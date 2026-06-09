'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mocking API call for now
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 bg-[#050505] relative z-10 border-t border-surface-2 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-gold/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let&apos;s <span className="text-accent-gold">Connect</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to craft your next unforgettable experience? Reach out to us and let&apos;s start planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-surface-1 border border-surface-2 rounded-3xl overflow-hidden backdrop-blur-xl">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 bg-[#0a0a0a] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            
            <div className="z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Contact Information</h3>
              <p className="text-gray-400 mb-8 md:mb-12 text-sm md:text-base">Fill up the form and our team will get back to you within 24 hours.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400">hello@festhive.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-400">Jaipur,<br/>Rajasthan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 p-6 md:p-12">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We will be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 relative group">
                    <label className="text-sm font-medium text-gray-400 pl-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-600 focus:border-accent-gold text-white px-1 py-3 outline-none transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2 relative group">
                    <label className="text-sm font-medium text-gray-400 pl-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-600 focus:border-accent-gold text-white px-1 py-3 outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative group">
                  <label className="text-sm font-medium text-gray-400 pl-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-600 focus:border-accent-gold text-white px-1 py-3 outline-none transition-colors"
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className="space-y-2 relative group pt-4">
                  <label className="text-sm font-medium text-gray-400 pl-1">Your Message</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-gray-600 focus:border-accent-gold text-white px-1 py-3 outline-none transition-colors resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
