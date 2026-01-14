
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useApp } from '../App';

const Contact: React.FC = () => {
  const { dispatch } = useApp();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Handle pre-fill from Diagnostic Wizard or other sources
    const state = location.state as { prefillMessage?: string };
    if (state?.prefillMessage) {
      setFormData(prev => ({ ...prev, message: state.prefillMessage }));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });

    // Mock "API Call" to database
    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toLocaleString(),
        status: 'unread' as const
      };
      dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { id: Date.now().toString(), type: 'success', message: 'Message sent successfully!' } 
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      <section className="bg-black py-24 border-b border-white/5 min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Contact Details */}
            <div className="space-y-12">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in <span className="text-green-500">Touch</span></h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Have a technical issue? Our team at North West University, Mafikeng is ready to assist you. Contact us via phone, email, or WhatsApp for a fast response.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="https://wa.me/27720103533" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-6 p-6 rounded-2xl bg-zinc-950 border border-green-500/20 group hover:border-green-500 transition-all shadow-lg shadow-green-500/5 block"
                >
                  <div className="h-12 w-12 rounded-xl bg-green-500 flex items-center justify-center text-black flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 flex items-center">
                      Chat on WhatsApp <span className="ml-2 text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full uppercase">Instant</span>
                    </h4>
                    <p className="text-green-500 font-mono text-xl">072 010 3533</p>
                    <p className="text-gray-500 text-sm mt-1">Best for quick diagnostics and status updates.</p>
                  </div>
                </a>

                <div className="flex items-start gap-6 p-6 rounded-2xl bg-zinc-950 border border-white/5 group hover:border-white/20 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Emergency Calls</h4>
                    <p className="text-gray-400">073 981 4050</p>
                    <p className="text-gray-400 text-sm italic">Available for same-day urgent callouts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 rounded-2xl bg-zinc-950 border border-white/5 group hover:border-white/20 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-green-500 text-sm font-bold">North West University, Mafikeng</p>
                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">Available campus-wide</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 rounded-2xl bg-zinc-950 border border-white/5 group hover:border-white/20 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Support</h4>
                    <p className="text-gray-400">obakengkobuane16@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="p-10 rounded-3xl bg-zinc-950 border border-white/10 relative z-10 shadow-2xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                    <CheckCircle2 className="h-20 w-20 text-green-500 animate-bounce" />
                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                    <p className="text-gray-500 max-w-xs">Thank you. Obakeng will get back to you shortly at your student or personal email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name" 
                          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your@email.com" 
                          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="072 000 0000" 
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Your Message</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Describe the issue with your PC..." 
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 transition-colors resize-none"
                      />
                    </div>
                    <button className="w-full py-5 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center justify-center shadow-lg shadow-green-500/10">
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
              <div className="absolute -inset-4 bg-green-500/5 blur-3xl -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
