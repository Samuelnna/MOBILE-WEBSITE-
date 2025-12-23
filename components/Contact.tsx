import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-primary font-bold tracking-wider uppercase mb-3 text-sm">Get in Touch</h2>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-800 mb-6">We're Here to Help</h2>
          <p className="text-gray-600 text-lg">Have questions? Ready to book a consultation? Reach out to our team today.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-accent">
              <h3 className="font-heading font-bold text-xl text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-light p-3 rounded-full text-brand-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Phone</p>
                    <a href="tel:+2348161502448" className="text-gray-600 hover:text-brand-primary transition-colors">+234 816 150 2448</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-light p-3 rounded-full text-brand-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Email</p>
                    <a href="mailto:mobilehealthcareinitiative@gmail.com" className="text-gray-600 hover:text-brand-primary transition-colors text-sm break-all">mobilehealthcareinitiative@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-light p-3 rounded-full text-brand-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Headquarters</p>
                    <p className="text-gray-600">Lagos, Nigeria<br/>Remote Hub - West Africa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-light p-3 rounded-full text-brand-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-700">Support Hours</p>
                    <p className="text-gray-600">Mon-Fri: 8am - 8pm WAT<br/>Sat-Sun: 9am - 5pm WAT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg h-full flex flex-col justify-center">
              {isSubmitted ? (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-heading font-bold text-3xl text-gray-800 mb-4">Message Sent!</h3>
                  <p className="text-gray-600 mb-8 max-w-sm mx-auto text-lg">Thank you for reaching out. A healthcare representative will contact you shortly.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-all active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-2xl text-gray-800 mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-accent focus:ring-0 outline-none transition-colors" placeholder="Jane" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-accent focus:ring-0 outline-none transition-colors" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input required type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-accent focus:ring-0 outline-none transition-colors" placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                        <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-accent focus:ring-0 outline-none transition-colors text-gray-600">
                          <option>General Inquiry</option>
                          <option>Schedule Appointment</option>
                          <option>Billing Question</option>
                          <option>Technical Support</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                      <textarea required rows={5} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-accent focus:ring-0 outline-none transition-colors" placeholder="How can we help you today?"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-10 py-4 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-secondary transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;