
import React, { useEffect, useState } from 'react';

const Entrance: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 2500);
    const t3 = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${stage === 2 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <h1 className={`text-4xl md:text-6xl font-black tracking-tight transform transition-all duration-1000 ${stage === 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          CS:GO Legacy, <span className="text-[#FC2600]">done right.</span>
        </h1>
        <div className={`mt-4 h-1 bg-[#FC2600] transition-all duration-1000 ease-out ${stage === 1 ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
};

export default Entrance;
