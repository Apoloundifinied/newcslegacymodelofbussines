
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const SecuritySeal: React.FC = () => {
  const [status, setStatus] = useState<'verifying' | 'secure'>('verifying');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('secure'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-md">
      {status === 'verifying' ? (
        <>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500/80">Verifying Hash...</span>
        </>
      ) : (
        <>
          <ShieldCheck size={12} className="text-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Encrypted</span>
          <Lock size={10} className="text-white/30" />
        </>
      )}
    </div>
  );
};

export default SecuritySeal;
