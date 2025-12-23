import React, { useState } from 'react';
import { Activity, Search, AlertTriangle, ArrowRight, Loader2, Sparkles, Heart } from 'lucide-react';
import { analyzeSymptoms } from '../services/geminiService';

interface SymptomCheckerProps {
  onBook: (service?: string) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onBook }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const analysis = await analyzeSymptoms(query);
      setResult(analysis);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'EMERGENCY': return 'text-red-600 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-brand-primary bg-brand-soft border-brand-soft';
    }
  };

  return (
    <section id="ai-checker" className="py-24 md:py-32 bg-brand-soft/50 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-primary shadow-sm border border-brand-soft text-sm font-bold mb-6">
              <Sparkles size={16} />
              <span>Mobile AI Assistant</span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-slate mb-6">Symptom Analyzer & Triage</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
              Tell us how you're feeling. Our AI analyzes your symptoms and directs you to the right telemedicine department instantly.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-2xl shadow-brand-primary/5 p-8 md:p-12 border border-brand-soft">
            {!result ? (
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="relative">
                  <textarea 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., I've had a persistent dry cough and mild fever for 2 days..."
                    className="w-full h-40 px-8 py-6 rounded-[2rem] bg-brand-soft/50 border-2 border-transparent focus:border-brand-accent focus:bg-white focus:outline-none transition-all text-brand-slate font-medium text-lg placeholder:text-gray-400"
                  />
                  <div className="absolute bottom-6 right-8 flex items-center gap-2 text-brand-primary/40 text-sm font-bold uppercase tracking-wider">
                    <Activity size={16} />
                    <span>Analyzing Live</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="w-full py-6 medical-gradient text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="animate-spin" /> Assessing Symptoms...</>
                  ) : (
                    <><Search size={24} /> Get Assessment</>
                  )}
                </button>
              </form>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-extrabold text-2xl text-brand-slate">AI Assessment</h3>
                      <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest ${getUrgencyColor(result.urgency)}`}>
                        {result.urgency} Urgency
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                      {result.assessment}
                    </p>

                    <div className="p-6 bg-brand-soft/50 rounded-2xl border border-brand-soft">
                      <h4 className="font-bold text-brand-slate mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-brand-accent" />
                        Professional Disclaimer
                      </h4>
                      <p className="text-gray-500 text-sm italic leading-relaxed">
                        {result.disclaimer}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-72 flex flex-col gap-4">
                    <div className="bg-brand-primary/5 p-8 rounded-[2rem] border border-brand-primary/10 text-center flex-1 flex flex-col justify-center">
                      <Heart className="mx-auto text-brand-heart mb-4" size={40} />
                      <p className="text-brand-slate font-bold text-sm uppercase mb-1">Recommended</p>
                      <p className="text-brand-primary font-extrabold text-2xl mb-6">{result.recommendedService}</p>
                      
                      <button 
                        onClick={() => onBook(result.recommendedService)}
                        className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        Book Now <ArrowRight size={18} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {setResult(null); setQuery('');}}
                      className="py-4 text-brand-slate/60 font-bold text-sm hover:text-brand-primary transition-colors"
                    >
                      Analyze New Symptoms
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;