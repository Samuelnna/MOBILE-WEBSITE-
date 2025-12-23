import React, { useState, useEffect } from 'react';
import { Menu, X, HeartPulse, ChevronRight, Phone, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onBook: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for fixed header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'AI Checker', id: 'ai-checker' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-3 group transition-transform active:scale-95">
              <div className={`p-2.5 rounded-xl shadow-lg transition-all duration-500 animate-heartbeat ${scrolled ? 'bg-brand-primary text-white' : 'bg-white text-brand-heart'}`}>
                <HeartPulse size={26} />
              </div>
              <div className="flex flex-col">
                <span className={`font-heading font-extrabold text-xl md:text-2xl leading-none transition-colors duration-500 ${scrolled ? 'text-brand-slate' : 'text-white'}`}>
                  Mobile Health<span className="text-brand-accent">.</span>
                </span>
                <span className={`text-[10px] uppercase tracking-[0.3em] font-black transition-colors duration-500 ${scrolled ? 'text-brand-primary' : 'text-white/70'}`}>
                  Initiative
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`font-bold text-sm tracking-widest uppercase transition-all hover:text-brand-accent active:scale-95 relative group overflow-hidden ${scrolled ? 'text-brand-slate' : 'text-white/90'}`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform"></span>
                </a>
              ))}
              <button 
                onClick={onBook}
                className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl ${scrolled ? 'bg-brand-primary text-white shadow-brand-primary/20 hover:bg-brand-secondary' : 'bg-white text-brand-primary hover:bg-brand-soft'}`}
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-3 rounded-2xl transition-all active:scale-90 ${scrolled ? 'text-brand-slate bg-brand-soft' : 'text-white bg-white/10 backdrop-blur-md'}`}
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-slate/60 backdrop-blur-md z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar Panel */}
      <aside 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8 flex items-center justify-between border-b border-brand-soft">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-brand-primary text-white rounded-xl animate-heartbeat">
                <HeartPulse size={24} />
              </div>
              <span className="font-heading font-black text-xl text-brand-slate uppercase tracking-wider">Menu</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-3 bg-brand-soft text-brand-slate rounded-2xl hover:bg-brand-primary hover:text-white transition-all rotate-0 hover:rotate-90"
            >
              <X size={26} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto py-10 px-8 space-y-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`flex items-center justify-between p-5 rounded-3xl hover:bg-brand-soft text-brand-slate font-black text-lg tracking-widest uppercase transition-all group ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
              >
                {link.name}
                <ChevronRight size={22} className="text-brand-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </a>
            ))}

            <div className={`pt-12 space-y-6 transition-all duration-700 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 px-5">Instant Support</p>
               <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+2348161502448" className="flex flex-col items-center gap-3 p-6 bg-brand-soft rounded-[2rem] text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                    <Phone size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Call</span>
                  </a>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="flex flex-col items-center gap-3 p-6 bg-brand-soft rounded-[2rem] text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                    <MessageCircle size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Support</span>
                  </a>
               </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-8 border-t border-brand-soft bg-brand-soft/30">
            <button 
              onClick={() => { setIsOpen(false); onBook(); }}
              className="w-full py-6 medical-gradient text-white font-black text-sm uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-brand-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Consult Now <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;