import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Clock, Star, Monitor, Cpu, Settings, Key, Gamepad2, Wifi, ArrowRight, RotateCcw } from 'lucide-react';
import { useApp } from '../App';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Monitor, Cpu, Settings, Key, Gamepad2, Wifi
};

const Home: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState<Record<string, string>>({});

  const diagnosticQuestions = [
    {
      id: 'device',
      question: 'What device are you using?',
      options: ['Desktop PC', 'Laptop', 'Other']
    },
    {
      id: 'issue',
      question: 'What seems to be the main problem?',
      options: ['Very Slow / Freezing', 'Wont Turn On', 'Blue Screen / Errors', 'Need Software Install']
    },
    {
      id: 'priority',
      question: 'How urgent is this fix?',
      options: ['Immediate (Today)', 'Next 24 Hours', 'Not Urgent']
    }
  ];

  const handleWizardChoice = (choice: string) => {
    setWizardData(prev => ({ ...prev, [diagnosticQuestions[wizardStep].id]: choice }));
    setWizardStep(prev => prev + 1);
  };

  const getWizardResult = () => {
    if (wizardData.issue === 'Very Slow / Freezing') return { title: 'Optimization & Upgrade', desc: 'We recommend a full system optimization and possible RAM/SSD upgrade.' };
    if (wizardData.issue === 'Wont Turn On') return { title: 'Hardware Diagnostic', desc: 'This likely needs a physical component inspection at our shop.' };
    return { title: 'Software Support', desc: 'Our technician can likely resolve this with a fresh install or remote support.' };
  };

  const handleBookWithResult = () => {
    const result = getWizardResult();
    const message = `Wizard Result: ${result.title}. Device: ${wizardData.device}. Issue: ${wizardData.issue}. Priority: ${wizardData.priority}.`;
    navigate('/contact', { state: { prefillMessage: message } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent)] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold tracking-widest uppercase">
                <Zap className="h-3 w-3 mr-2" />
                Same Day Service Guarantee
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                Your Computer in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                  The Right Hands
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                Expert repairs, upgrades, and IT solutions tailored for your workflow. Same Day Service is our standard at North West University, Mafikeng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="px-8 py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center">
                  Book A Repair <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/services" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center">
                  View Services
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:block relative"
            >
               <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-green-500/10 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1200" 
                    alt="Authentic Computer Repair" 
                    className="w-full h-[500px] object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/80 backdrop-blur-md rounded-xl border border-white/5">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center relative">
                        <ShieldCheck className="text-black h-6 w-6 relative z-10" />
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Verified Technician</p>
                        <p className="text-[10px] text-green-500 font-mono uppercase tracking-widest">OBAKENG_KOBUANE_ID: 072010</p>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center text-green-500">
                <Clock className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-black text-white">Same Day</h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Guaranteed Service</p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center text-green-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-black text-white">Genuine</h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Parts & Software</p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center text-green-500">
                <Star className="h-8 w-8" />
              </div>
              <h4 className="text-3xl font-black text-white">Trusted</h4>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">By NWU Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Professional <br /><span className="text-green-500">PC Solutions</span></h2>
              <p className="text-gray-400">North West University, Mafikeng.</p>
            </div>
            <Link to="/services" className="text-green-500 font-bold hover:underline inline-flex items-center">
              See All Services <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.services.slice(0, 6).map((service, idx) => {
              const Icon = iconMap[service.icon] || Monitor;
              return (
                <motion.div 
                  key={service.id} 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-8 rounded-2xl bg-black border border-white/5 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500"
                >
                  <div className="h-14 w-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-black transition-all duration-500 transform group-hover:rotate-6">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-500 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                    {service.description}
                  </p>
                  <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white flex items-center">
                    Get Started <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-12 text-center text-black space-y-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-black">Ready for a Faster PC?</h2>
            <p className="text-lg font-medium opacity-90 max-w-2xl mx-auto">
              WhatsApp Obakeng directly at 072 010 3533 or visit North West University, Mafikeng today.
            </p>
            <div className="pt-4">
              <Link to="/contact" className="px-10 py-5 bg-black text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-black/20 transition-all inline-flex items-center">
                Contact Us Now <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;