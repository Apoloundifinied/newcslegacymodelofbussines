
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthFormProps {
  onAuth: (user: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Using localStorage as memory storage for this demo
    const users = JSON.parse(localStorage.getItem('csgo_users') || '[]');

    if (isLogin) {
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      if (user) {
        onAuth(user);
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (users.some((u: any) => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      
      // AUTO-ADMIN logic for demonstration
      const role = formData.email === 'admin@legacy.com' ? 'admin' : 'user';
      
      const newUser = {
        ...formData,
        role: role,
        purchasedItems: []
      };
      users.push(newUser);
      localStorage.setItem('csgo_users', JSON.stringify(users));
      onAuth(newUser);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-400 text-sm">Join the elite CS:GO legacy community</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded mb-6 text-[10px] text-blue-400 font-bold uppercase tracking-widest">
        Security Note: Register with admin@legacy.com to access the management panel.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text"
                required
                className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#FC2600] outline-none transition-colors"
                placeholder="MajorWinner99"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="email"
              required
              className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#FC2600] outline-none transition-colors"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="password"
              required
              className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#FC2600] outline-none transition-colors"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

        <button 
          type="submit"
          className="w-full bg-[#FC2600] hover:bg-[#A62B41] py-4 rounded-lg font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:translate-y-[-2px] active:scale-95 shadow-lg shadow-[#FC2600]/20"
        >
          {isLogin ? 'Login Now' : 'Join Legacy'}
          <ArrowRight size={20} />
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-400 hover:text-white text-sm font-bold uppercase transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
