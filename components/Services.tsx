import React from 'react';
import { Stethoscope, Video, Pill, Brain, Activity, Clock, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps extends ServiceItem {
  onBook: (service: string) => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, onBook, index }) => (
  <div 
    onClick={() => onBook(title)}
    className={`bg-white p-10 rounded-[2.5rem] shadow-sm border border-brand-soft hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-3 transition-all duration-500 group cursor-pointer reveal stagger-${(index % 3) + 1}`}
  >
    <div className="w-16 h-16 bg-brand-soft rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:medical-gradient group-hover:text-white group-hover:rotate-12 transition-all duration-500">
      <Icon size={34} />
    </div>
    <h3 className="font-heading font-extrabold text-2xl text-brand-slate mb-4 group-hover:text-brand-primary transition-colors">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-medium mb-8 min-h-[80px]">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-brand-primary font-bold text-sm tracking-wide">
        Details
      </span>
      <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
        <ArrowRight size={18} />
      </div>
    </div>
  </div>
);

interface ServicesProps {
  onBook: (service?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onBook }) => {
  const services: ServiceItem[] = [
    {
      title: "Telehealth Visits",
      description: "Secure HD video consultations with licensed physicians for quick diagnostics and recovery plans.",
      icon: Video
    },
    {
      title: "Family Medicine",
      description: "Dedicated primary care for all ages, focusing on long-term wellness and preventive health.",
      icon: Stethoscope
    },
    {
      title: "Mental Wellness",
      description: "Private, expert psychiatric care and counseling support for your mental health journey.",
      icon: Brain
    },
    {
      title: "E-Prescriptions",
      description: "Instant digital prescriptions sent to your preferred local pharmacy with one-tap refills.",
      icon: Pill
    },
    {
      title: "Vital Tracking",
      description: "Integration with wearable health tech to monitor blood pressure and glucose levels remotely.",
      icon: Activity
    },
    {
      title: "Express Care",
      description: "Urgent medical advice for minor injuries and illnesses without the emergency room wait.",
      icon: Clock
    }
  ];

  return (
    <section id="services" className="py-24 md:py-40 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8 reveal">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-bold tracking-[0.3em] uppercase mb-4 block text-xs">Healthcare Excellence</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-brand-slate mb-6">Expert Services <br />At Your Fingerprints</h2>
          </div>
          <p className="text-gray-500 text-lg max-w-sm font-medium border-l-4 border-brand-accent pl-8 py-2">Our digital-first approach ensures you get world-class medical attention without the commute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} onBook={onBook} />
          ))}
        </div>
        
        <div className="mt-24 p-12 medical-gradient rounded-[3rem] text-center relative overflow-hidden shadow-2xl shadow-brand-primary/20 reveal">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-24 -mt-24 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-accent/20 rounded-full -ml-12 -mb-12"></div>
          
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 relative z-10">Experience the Future of Health</h3>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">Join thousands of patients who have already transitioned to the Mobile Healthcare Initiative ecosystem.</p>
          <button 
            onClick={() => onBook()}
            className="inline-flex items-center gap-3 px-14 py-6 bg-white text-brand-primary font-extrabold text-lg rounded-2xl hover:bg-brand-accent hover:text-brand-slate hover:scale-105 active:scale-95 transition-all relative z-10 shadow-xl"
          >
            Schedule Consultation <Activity size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;