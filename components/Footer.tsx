import React, { useState } from 'react';
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/10 p-2 rounded-full text-brand-accent">
                <HeartPulse size={24} />
              </div>
              <span className="font-heading font-bold text-xl">
                Mobile Health<span className="text-brand-accent">.</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming healthcare delivery through technology and compassion. We bring the clinic to your doorstep.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-brand-primary transition-all active:scale-90">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Doctors', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Our Services</h4>
            <ul className="space-y-3">
              {['Primary Care', 'Urgent Care', 'Mental Health', 'Dermatology', 'Pediatrics', 'Women\'s Health'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for health tips and updates.</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors"
              />
              <button 
                type="submit"
                className={`flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all active:scale-95 ${isSubscribed ? 'bg-green-500 text-white' : 'bg-brand-accent text-brand-primary hover:bg-white'}`}
              >
                {isSubscribed ? <><Check size={18} /> Subscribed!</> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Mobile Healthcare Initiative. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-24 right-8 bg-brand-primary text-white p-3 rounded-full shadow-lg hover:bg-brand-secondary transition-all active:scale-90 z-40 hidden md:flex"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;