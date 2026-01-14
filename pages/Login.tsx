
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useApp } from '../App';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'obby123') {
      dispatch({ type: 'LOGIN' });
      navigate('/admin');
    } else {
      setError('Invalid username or password credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center flex flex-col items-center">
          <Logo className="h-20 mb-6" showText={false} />
          <h2 className="text-3xl font-bold tracking-tight">Admin Terminal</h2>
          <p className="mt-2 text-gray-500">Authorized personnel access only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-zinc-950 p-10 rounded-3xl border border-white/5">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin Username"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Password"
                className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all flex items-center justify-center"
          >
            Authenticate Session
          </button>

          <p className="text-center text-xs text-gray-600">
            Forgot credentials? Contact system supervisor.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
