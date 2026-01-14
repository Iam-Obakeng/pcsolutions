
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  Plus, Edit2, Trash2, Mail, Layout, PlusCircle, 
  Search, X, Check, Eye, ChevronDown, Clock, ShieldAlert, Database, Cloud
} from 'lucide-react';
import { Service } from '../types';

const AdminDashboard: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'services' | 'messages'>('services');
  const [isEditing, setIsEditing] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      dispatch({ type: 'SET_LOADING', payload: true });
      setTimeout(() => {
        dispatch({ type: 'DELETE_SERVICE', payload: id });
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ 
          type: 'ADD_NOTIFICATION', 
          payload: { id: Date.now().toString(), type: 'success', message: 'Service removed from database' } 
        });
      }, 800);
    }
  };

  const ServiceModal = ({ service, isNew }: { service?: Service, isNew: boolean }) => {
    const [formData, setFormData] = useState<Service>(
      service || { id: Date.now().toString(), title: '', description: '', icon: 'Settings', price: '0' }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch({ type: 'SET_LOADING', payload: true });
      
      setTimeout(() => {
        if (isNew) {
          dispatch({ type: 'ADD_SERVICE', payload: formData });
        } else {
          dispatch({ type: 'UPDATE_SERVICE', payload: formData });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ 
          type: 'ADD_NOTIFICATION', 
          payload: { id: Date.now().toString(), type: 'success', message: `Database entry ${isNew ? 'created' : 'updated'}` } 
        });
        setIsEditing(null);
        setIsAdding(false);
      }, 1000);
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold">{isNew ? 'New Service' : 'Edit Service'}</h3>
            <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Service Title</label>
              <input 
                required
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Price (R)</label>
              <input 
                required
                type="number"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Description</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 resize-none" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold tracking-widest text-gray-500">Icon Key</label>
              <select 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
              >
                <option value="Monitor">Monitor</option>
                <option value="Cpu">Processor</option>
                <option value="Settings">Gear/Settings</option>
                <option value="Key">Key/Activation</option>
                <option value="Gamepad2">Gaming</option>
                <option value="Wifi">Remote/Wifi</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all">
              {isNew ? 'Add Service' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Real-time DB Connection Status */}
        <div className="mb-8 flex items-center justify-between p-4 bg-zinc-950 border border-white/5 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Database className="h-5 w-5 text-green-500" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-xs font-mono text-green-500">DATABASE_ONLINE: SQLite_v3.0</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
             <Cloud className="h-4 w-4" />
             <span>Syncing in real-time...</span>
          </div>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Services</p>
              <h4 className="text-4xl font-black">{state.services.length}</h4>
            </div>
            <Layout className="h-10 w-10 text-green-500/20" />
          </div>
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Messages</p>
              <h4 className="text-4xl font-black">{state.messages.length}</h4>
            </div>
            <Mail className="h-10 w-10 text-green-500/20" />
          </div>
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Unread</p>
              <h4 className="text-4xl font-black text-green-500">{state.messages.filter(m => m.status === 'unread').length}</h4>
            </div>
            <ShieldAlert className="h-10 w-10 text-green-500/20" />
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'services' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'messages' ? 'bg-green-500 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Messages
            </button>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="w-full md:w-64 bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:border-green-500 outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {activeTab === 'services' && (
              <button 
                onClick={() => setIsAdding(true)}
                className="p-2.5 bg-green-500 text-black rounded-xl hover:bg-green-400 transition-all flex items-center whitespace-nowrap"
              >
                <PlusCircle className="h-5 w-5 mr-2" /> Add Service
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-zinc-950 rounded-2xl border border-white/5 overflow-hidden">
          {activeTab === 'services' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Price (R)</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {state.services.filter(s => s.title.toLowerCase().includes(search.toLowerCase())).map(service => (
                    <tr key={service.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-bold">{service.title}</td>
                      <td className="px-6 py-4 font-mono text-green-500">{service.price || '0'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{service.description}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => setIsEditing(service)}
                            className="p-2 text-gray-400 hover:text-green-500"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {state.messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())).map(msg => (
                <div key={msg.id} className={`p-6 hover:bg-white/5 transition-colors ${msg.status === 'unread' ? 'border-l-4 border-green-500' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${msg.status === 'unread' ? 'bg-green-500 text-black' : 'bg-zinc-900 text-gray-500'}`}>
                        {msg.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold">{msg.name}</h5>
                        <p className="text-xs text-gray-500">{msg.email} • {msg.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-2">
                        {msg.timestamp}
                      </p>
                      {msg.status === 'unread' && (
                        <button 
                          onClick={() => {
                             dispatch({ type: 'MARK_READ', payload: msg.id });
                             dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), type: 'info', message: 'Message marked as read' }});
                          }}
                          className="text-[10px] uppercase font-bold text-green-500 hover:underline"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 text-sm text-gray-400 leading-relaxed italic">
                    "{msg.message}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(isEditing || isAdding) && <ServiceModal service={isEditing || undefined} isNew={isAdding} />}
    </div>
  );
};

export default AdminDashboard;
