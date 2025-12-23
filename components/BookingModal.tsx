import React, { useState, useMemo } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Mail, ChevronRight, CheckCircle2, ChevronLeft } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const CalendarPicker = ({ selectedDate, onSelect }: { selectedDate: string, onSelect: (date: string) => void }) => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    // Padding for start of month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    // Days of month
    for (let i = 1; i <= days; i++) {
      calendarDays.push(new Date(year, month, i));
    }
    return calendarDays;
  }, [viewDate]);

  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const year = viewDate.getFullYear();

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    const d = new Date(selectedDate);
    return d.getDate() === date.getDate() && 
           d.getMonth() === date.getMonth() && 
           d.getFullYear() === date.getFullYear();
  };

  const isPast = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-brand-soft shadow-inner">
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="font-bold text-brand-slate">{monthName} {year}</h4>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-brand-soft rounded-lg transition-colors"><ChevronLeft size={18} /></button>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-brand-soft rounded-lg transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <span key={d} className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {date ? (
              <button
                disabled={isPast(date)}
                onClick={() => {
                  const offset = date.getTimezoneOffset();
                  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
                  onSelect(localDate.toISOString().split('T')[0]);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all
                  ${isSelected(date) ? 'bg-brand-primary text-white shadow-md' : 
                    isPast(date) ? 'text-gray-300 cursor-not-allowed' : 'text-brand-slate hover:bg-brand-soft'}`}
              >
                {date.getDate()}
              </button>
            ) : <div className="w-8 h-8" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialService }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService || 'Primary Care',
    date: '',
    time: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  const services = ['Primary Care', 'Urgent Care', 'Mental Health', 'Dermatology', 'Pediatrics', 'Women\'s Health'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-slate/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-brand-slate z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="animate-in slide-in-from-right duration-300">
              <h2 className="font-heading font-extrabold text-3xl text-brand-slate mb-2">Book Appointment</h2>
              <p className="text-gray-500 mb-8 font-medium">Select a service and time that works for you.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-brand-slate mb-2">Select Medical Service</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-brand-soft border border-brand-soft focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-brand-slate font-medium"
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-slate mb-2">Preferred Date</label>
                    <CalendarPicker 
                      selectedDate={formData.date} 
                      onSelect={(date) => setFormData({...formData, date})} 
                    />
                    {formData.date && (
                      <p className="mt-2 text-xs font-bold text-brand-primary">Selected: {formData.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-slate mb-2">Preferred Time</label>
                    <div className="relative mb-6">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                      <select 
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-soft border border-brand-soft focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-brand-slate font-medium appearance-none"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      >
                        <option value="">Select Time</option>
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:30 AM</option>
                        <option>01:00 PM</option>
                        <option>02:30 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                    
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!formData.date || !formData.time}
                      className="w-full py-5 medical-gradient text-white font-bold rounded-2xl shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                    >
                      Next Step <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="animate-in slide-in-from-right duration-300">
              <h2 className="font-heading font-extrabold text-3xl text-brand-slate mb-2">Patient Details</h2>
              <p className="text-gray-500 mb-8 font-medium">Please provide your contact information.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-brand-slate mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-soft border border-brand-soft focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-brand-slate font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-slate mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-soft border border-brand-soft focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-brand-slate font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="p-4 bg-brand-soft/50 rounded-2xl border border-brand-soft">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Service:</span>
                    <span className="text-brand-slate font-bold">{formData.service}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Schedule:</span>
                    <span className="text-brand-slate font-bold">{formData.date} at {formData.time}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                   <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-5 medical-gradient text-white font-bold rounded-2xl shadow-xl shadow-brand-primary/20 active:scale-95 transition-all"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-brand-soft text-brand-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={56} />
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-brand-slate mb-4">Appointment Scheduled!</h2>
              <p className="text-gray-500 mb-10 font-medium leading-relaxed">
                Thank you, <span className="text-brand-primary font-bold">{formData.name}</span>. A confirmation email has been sent to {formData.email}.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-5 bg-brand-slate text-white font-bold rounded-2xl hover:bg-brand-secondary transition-all active:scale-95"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;