import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'Welcome to Obby\'s PC Solutions. How can I assist your hardware today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Simulated Bot logic
    setTimeout(() => {
      let reply = "I've logged your query. A technician will review this shortly. For urgent help, WhatsApp us at 072 010 3533.";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        reply = "Pricing depends on the issue, but standard diagnostics are free! Check our Services page for estimates or WhatsApp 072 010 3533 for a custom quote.";
      } else if (lowerInput.includes('slow') || lowerInput.includes('lag')) {
        reply = "A slow PC often needs a RAM upgrade or SSD swap. We can optimize your system same-day at NWU Mafikeng!";
      } else if (lowerInput.includes('whatsapp') || lowerInput.includes('contact')) {
        reply = "You can reach Obakeng directly on WhatsApp at 072 010 3533 or call 073 981 4050.";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 bg-zinc-950 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/10 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-black">
                <Terminal className="h-5 w-5" />
                <span className="font-bold text-sm tracking-tighter">OBBY_TERMINAL_V1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black hover:bg-black/10 p-1 rounded">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-4 space-y-4 overflow-y-auto font-mono text-xs">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    m.role === 'user' 
                    ? 'bg-green-500 text-black rounded-tr-none' 
                    : 'bg-zinc-900 text-green-400 border border-green-500/10 rounded-tl-none'
                  }`}>
                    {m.role === 'bot' && <span className="block opacity-50 mb-1 text-[10px] uppercase tracking-widest">SYSTEM_MSG:</span>}
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-black">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message or command..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm focus:border-green-500 outline-none font-mono"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 p-2">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 bg-green-500 rounded-full shadow-lg shadow-green-500/20 flex items-center justify-center text-black relative"
      >
        <MessageSquare className="h-7 w-7" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-600 border-2 border-black"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;