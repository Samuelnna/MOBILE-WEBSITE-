import React from 'react';
import { ArrowRight, Activity, Stethoscope, Heart, Pill, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onBook: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBook }) => {
  return (
    <section id="home" className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden scroll-mt-20 bg-brand-slate">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Clean modern medical office" 
          className="w-full h-full object-cover opacity-40 scale-110 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/95 via-brand-primary/80 to-brand-slate/90"></div>
        
        {/* Animated Floating Medical Icons */}
        <div className="absolute top-[15%] left-[10%] text-white/10 animate-float pointer-events-none">
          <Stethoscope size={120} />
        </div>
        <div className="absolute bottom-[20%] right-[15%] text-brand-accent/10 animate-float-slow pointer-events-none">
          <Heart size={160} />
        </div>
        <div className="absolute top-[40%] right-[10%] text-white/5 animate-float pointer-events-none">
          <Pill size={80} />
        </div>
        <div className="absolute bottom-[10%] left-[20%] text-brand-accent/5 animate-float-slow pointer-events-none">
          <ShieldCheck size={100} />
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-20">
        <div className="max-w-4xl mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000">
            <Activity size={18} className="text-brand-accent animate-pulse" />
            <span className="tracking-wide">Virtual Care Hub • Lagos • Remote</span>
          </div>
          
          <h1 className="font-heading font-extrabold text-5xl md:text-8xl text-white mb-8 leading-[1] animate-in fade-in slide-in-from-left-8 duration-1000">
            Healthcare <br />
            <span className="text-brand-accent italic drop-shadow-lg">Reimagined.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl leading-relaxed font-light animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
            Expert medical advice, AI-powered triage, and digital prescriptions. Professional care that fits your mobile lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <button 
              onClick={(e) => {
                e.preventDefault();
                onBook();
              }}
              className="px-12 py-6 bg-brand-accent text-brand-slate font-extrabold text-lg rounded-2xl shadow-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group relative z-20"
            >
              Start Consultation
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <a 
              href="#ai-checker" 
              className="px-12 py-6 bg-white/5 border-2 border-white/20 text-white font-bold text-lg rounded-2xl backdrop-blur-lg hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all text-center relative z-20"
            >
              AI Symptom Check
            </a>
          </div>

          {/* Quick Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-10 max-w-3xl animate-in fade-in duration-1000 delay-700">
            <div className="group cursor-default">
              <p className="text-4xl font-extrabold text-white group-hover:text-brand-accent transition-colors">50k+</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Total Patients</p>
            </div>
            <div className="group cursor-default">
              <p className="text-4xl font-extrabold text-white group-hover:text-brand-accent transition-colors">4.9/5</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">App Rating</p>
            </div>
            <div className="group cursor-default">
              <p className="text-4xl font-extrabold text-white group-hover:text-brand-accent transition-colors">15m</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Avg. Response</p>
            </div>
            <div className="group cursor-default">
              <p className="text-4xl font-extrabold text-white group-hover:text-brand-accent transition-colors">24/7</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Availability</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-soft/50"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;