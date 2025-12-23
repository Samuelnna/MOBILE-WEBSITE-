import React from 'react';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-full h-full border-4 border-brand-accent rounded-3xl z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical Team Meeting" 
              className="relative z-10 rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
             <div className="absolute -bottom-8 -right-8 w-64 p-6 bg-brand-primary rounded-xl shadow-xl z-20 hidden md:block">
                <p className="text-white font-heading font-bold text-4xl mb-1">5k+</p>
                <p className="text-white/80 text-sm">Patients served remotely across the country.</p>
             </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-brand-primary font-bold tracking-wider uppercase mb-3 text-sm">Who We Are</h2>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-800 mb-6">Bridging the Gap in Modern Healthcare</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Mobile Healthcare Initiative was founded on a simple premise: quality healthcare should be accessible to everyone, regardless of their location or schedule. We leverage secure technology to bring the doctor's office to your living room.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our team consists of board-certified physicians, nurse practitioners, and specialists dedicated to patient-centered care.
            </p>

            <ul className="space-y-4">
              {['Secure & HIPAA Compliant', 'Affordable Transparent Pricing', 'Available 24/7/365', 'Top Rated Specialists'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-brand-accent shrink-0" size={20} />
                  <span className="font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

             <div className="mt-10">
                 <a 
                   href="#services"
                   className="inline-block text-brand-primary font-bold border-b-2 border-brand-primary hover:text-brand-secondary hover:border-brand-secondary transition-all active:scale-95 pb-1"
                 >
                     Explore Our Services &rarr;
                 </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;