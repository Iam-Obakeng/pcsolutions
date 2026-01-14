
import React, { useState } from 'react';
import { Monitor, Cpu, Settings, Key, Gamepad2, Wifi, Server, Database, ShieldCheck, ChevronRight, Calculator, CheckCircle } from 'lucide-react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, any> = {
  Monitor, Cpu, Settings, Key, Gamepad2, Wifi, Server, Database, ShieldCheck
};

const ServicesPage: React.FC = () => {
  const { state } = useApp();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const s = state.services.find(x => x.id === id);
    return sum + (s?.price ? parseInt(s.price) : 0);
  }, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Header */}
      <section className="bg-black py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Expert <span className="text-green-500">IT Services</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Professional solutions for every technical challenge. We specialize in software optimization, hardware maintenance, and proactive IT support.
          </p>
        </div>
      </section>

      {/* Interactive Price Estimator */}
      <section className="py-20 bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-3xl border border-green-500/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3 space-y-8">
                <div className="flex items-center space-x-3 text-green-500">
                  <Calculator className="h-6 w-6" />
                  <h2 className="text-2xl font-bold uppercase tracking-tight">Service Price Estimator</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.services.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex justify-between items-center group ${
                        selectedServices.includes(s.id) 
                        ? 'bg-green-500 border-green-500 text-black' 
                        : 'bg-zinc-900 border-white/5 text-gray-400 hover:border-green-500/50'
                      }`}
                    >
                      <span className="font-bold text-sm">{s.title}</span>
                      <span className={`text-xs font-mono font-bold ${selectedServices.includes(s.id) ? 'text-black' : 'text-green-500'}`}>
                        R{s.price || '0'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:w-1/3 flex flex-col justify-between p-8 bg-zinc-900 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-xl font-bold mb-6">Repair Summary</h3>
                  <div className="space-y-3 mb-8">
                    {selectedServices.length > 0 ? (
                      selectedServices.map(id => {
                        const s = state.services.find(x => x.id === id);
                        return (
                          <div key={id} className="flex justify-between text-xs text-gray-400">
                            <span>{s?.title}</span>
                            <span className="text-green-500 font-mono">R{s?.price}</span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-gray-600 italic">Select services to generate an estimate...</p>
                    )}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-sm font-bold text-gray-500 uppercase">Estimated Total:</span>
                    <span className="text-4xl font-black text-green-500">R{totalPrice}</span>
                  </div>
                  <Link 
                    to="/contact" 
                    className="w-full py-4 bg-green-500 text-black font-bold rounded-xl flex items-center justify-center hover:bg-green-400 transition-all"
                  >
                    Confirm & Book
                  </Link>
                  <p className="text-[10px] text-center text-gray-600 mt-4 uppercase tracking-widest">Prices subject to final diagnostic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {state.services.map((service) => {
              const Icon = iconMap[service.icon] || Settings;
              return (
                <motion.div 
                  key={service.id} 
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative p-10 bg-zinc-950 rounded-3xl border border-white/10 group-hover:border-green-500/30 transition-all">
                    <div className="h-16 w-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-8 h-20 overflow-hidden">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-10 text-sm text-gray-400">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Same-day completion</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Certified technician</li>
                    </ul>
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center text-green-500 font-bold hover:translate-x-2 transition-transform"
                    >
                      Inquire Details <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
