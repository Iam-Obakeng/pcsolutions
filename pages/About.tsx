import React from 'react';
import { Shield, Target, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-zinc-950 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-green-500">Obby's PC Solutions</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded on the principle of accessibility and technical excellence, we've been serving the North West University community with reliable IT support for years.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="h-1 w-20 bg-green-500 rounded-full" />
            <p className="text-gray-400 leading-relaxed">
              Obby's PC Solutions started with a simple mission: to provide high-quality computer repair services that don't break the bank. We understood that in today's digital world, a broken computer is more than just an inconvenience—it's a barrier to work, education, and connection.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Located at <strong>North West University, Mafikeng</strong>, we've grown into a trusted local hub for everything from Windows activations to complex hardware diagnostics. Our tagline, "Same Day Service – Your Computer in the Right Hands," isn't just a marketing slogan; it's our daily commitment to every student and staff member who trusts us with their device.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-zinc-950 rounded-xl border border-white/5">
                <p className="text-3xl font-bold text-green-500 mb-2">5+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Years Experience</p>
              </div>
              <div className="p-6 bg-zinc-950 rounded-xl border border-white/5">
                <p className="text-3xl font-bold text-green-500 mb-2">1000+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Devices Fixed</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
              alt="Workspace" 
              className="rounded-3xl shadow-2xl border border-white/10"
            />
            <div className="absolute -bottom-10 -left-10 p-8 bg-green-500 text-black rounded-2xl hidden md:block">
              <Users className="h-10 w-10 mb-4" />
              <p className="font-bold text-lg">Community Focused</p>
              <p className="text-sm opacity-80">Serving NWU Mafikeng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-zinc-950 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-500">The pillars that define our service quality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-black border border-white/5 text-center hover:border-green-500/50 transition-colors">
              <Shield className="h-10 w-10 text-green-500 mx-auto mb-6" />
              <h4 className="font-bold mb-3">Integrity</h4>
              <p className="text-gray-500 text-sm">Honest diagnostics and transparent pricing every time.</p>
            </div>
            <div className="p-8 rounded-2xl bg-black border border-white/5 text-center hover:border-green-500/50 transition-colors">
              <Target className="h-10 w-10 text-green-500 mx-auto mb-6" />
              <h4 className="font-bold mb-3">Precision</h4>
              <p className="text-gray-500 text-sm">Meticulous attention to detail in every repair.</p>
            </div>
            <div className="p-8 rounded-2xl bg-black border border-white/5 text-center hover:border-green-500/50 transition-colors">
              <Users className="h-10 w-10 text-green-500 mx-auto mb-6" />
              <h4 className="font-bold mb-3">Customer First</h4>
              <p className="text-gray-500 text-sm">We listen to your needs and provide tailored solutions.</p>
            </div>
            <div className="p-8 rounded-2xl bg-black border border-white/5 text-center hover:border-green-500/50 transition-colors">
              <Heart className="h-10 w-10 text-green-500 mx-auto mb-6" />
              <h4 className="font-bold mb-3">Passion</h4>
              <p className="text-gray-500 text-sm">We genuinely love technology and solving problems.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;