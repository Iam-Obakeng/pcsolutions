
import React, { useReducer, useEffect, createContext, useContext } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AppState, Action, Service, ContactMessage, AppNotification } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, Loader2 } from 'lucide-react';

const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Windows Installation', description: 'Fresh installs of Windows 10/11 with all drivers configured.', icon: 'Monitor', price: '450' },
  { id: '2', title: 'Hardware Upgrades', description: 'RAM, SSD, and GPU upgrades to speed up your machine.', icon: 'Cpu', price: '300' },
  { id: '3', title: 'Software Troubleshooting', description: 'Fixing slow performance, crashes, and software conflicts.', icon: 'Settings', price: '250' },
  { id: '4', title: 'Microsoft Activation', description: 'Official Office and Windows activation services.', icon: 'Key', price: '200' },
  { id: '5', title: 'Game Installation', description: 'Full setup for gaming libraries and optimization.', icon: 'Gamepad2', price: '150' },
  { id: '6', title: 'Remote Support', description: 'Quick fixes handled securely over the internet.', icon: 'Wifi', price: '200' },
];

const initialState: AppState = {
  services: JSON.parse(localStorage.getItem('obby_services') || JSON.stringify(INITIAL_SERVICES)),
  messages: JSON.parse(localStorage.getItem('obby_messages') || '[]'),
  notifications: [],
  isAdmin: sessionStorage.getItem('obby_admin') === 'true',
  isLoading: false,
};

function appReducer(state: AppState, action: Action): AppState {
  let newState: AppState = { ...state };
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_SERVICE':
      newState = { ...state, services: [...state.services, action.payload] };
      break;
    case 'UPDATE_SERVICE':
      newState = { ...state, services: state.services.map(s => s.id === action.payload.id ? action.payload : s) };
      break;
    case 'DELETE_SERVICE':
      newState = { ...state, services: state.services.filter(s => s.id !== action.payload) };
      break;
    case 'ADD_MESSAGE':
      newState = { ...state, messages: [action.payload, ...state.messages] };
      break;
    case 'MARK_READ':
      newState = { ...state, messages: state.messages.map(m => m.id === action.payload ? { ...m, status: 'read' } : m) };
      break;
    case 'ADD_NOTIFICATION':
      newState = { ...state, notifications: [...state.notifications, action.payload] };
      break;
    case 'REMOVE_NOTIFICATION':
      newState = { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
      break;
    case 'LOGIN':
      sessionStorage.setItem('obby_admin', 'true');
      newState = { ...state, isAdmin: true };
      break;
    case 'LOGOUT':
      sessionStorage.removeItem('obby_admin');
      newState = { ...state, isAdmin: false };
      break;
    default:
      return state;
  }
  
  localStorage.setItem('obby_services', JSON.stringify(newState.services));
  localStorage.setItem('obby_messages', JSON.stringify(newState.messages));
  return newState;
}

const AppContext = createContext<{ state: AppState, dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { state } = useApp();
  return state.isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="flex flex-col min-h-screen bg-black text-white relative">
          <Navbar />
          
          {/* Global Notifications */}
          <div className="fixed top-24 right-6 z-[200] space-y-3 pointer-events-none">
            <AnimatePresence>
              {state.notifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`pointer-events-auto flex items-center p-4 rounded-xl border shadow-xl ${
                    n.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 
                    n.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 
                    'bg-blue-500/10 border-blue-500/30 text-blue-500'
                  }`}
                >
                  {n.type === 'success' ? <CheckCircle className="h-5 w-5 mr-3" /> : 
                   n.type === 'error' ? <XCircle className="h-5 w-5 mr-3" /> : 
                   <Info className="h-5 w-5 mr-3" />}
                  <span className="text-sm font-medium">{n.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Global Loader Simulation */}
          {state.isLoading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center">
              <div className="bg-zinc-900 p-8 rounded-3xl border border-white/10 flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-green-500 animate-spin mb-4" />
                <p className="font-mono text-xs uppercase tracking-widest text-green-500">Processing Request...</p>
              </div>
            </div>
          )}

          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
