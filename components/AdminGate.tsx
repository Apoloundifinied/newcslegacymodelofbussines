
import React, { useState } from 'react';
import { Lock, ShieldAlert, ChevronRight, Terminal } from 'lucide-react';

interface AdminGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminGate: React.FC<AdminGateProps> = ({ onSuccess, onCancel }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const SECRET_KEY = 'LEGACY-ADM-2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate server-side hash verification
    setTimeout(() => {
      if (key === SECRET_KEY) {
        onSuccess();
      } else {
        setError(true);
        setKey('');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0a0a0a] border-2 border-[#FC2600]/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(252,38,0,0.15)] relative overflow-hidden">
        {/* Scanning Animation Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FC2600]/40 shadow-[0_0_15px_#FC2600] animate-[scan_3s_linear_infinite]" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FC2600]/10 rounded-full border border-[#FC2600]/30 mb-4">
            <ShieldAlert className="text-[#FC2600]" size={32} />
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Security Challenge</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Verification Required for Node: ADMIN_V1</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
              <Terminal size={12} />
              Encryption Key
            </label>
            <div className="relative">
              <input 
                type="password"
                autoFocus
                className={`w-full bg-black border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-lg py-4 px-4 text-center font-mono tracking-[0.5em] focus:border-[#FC2600] outline-none transition-all`}
                placeholder="••••••••••••"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className="w-5 h-5 border-2 border-[#FC2600] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse">Access Denied: Invalid Hash Reference</p>}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              disabled={loading || !key}
              className="w-full bg-[#FC2600] hover:bg-[#A62B41] py-4 rounded-lg font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
            >
              Verify Identity
              <ChevronRight size={18} />
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Cancel Access Request
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-[8px] text-gray-700 uppercase tracking-[0.2em] leading-relaxed text-center">
          Warning: Unauthorized access attempts are monitored and logged to the central security kernel. <br />
          Your IP and hardware ID have been cached.
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AdminGate;
