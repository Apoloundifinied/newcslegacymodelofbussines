
import React, { useEffect, useState } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalOverlayProps {
  itemName: string;
  onComplete: () => void;
}

const TerminalOverlay: React.FC<TerminalOverlayProps> = ({ itemName, onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const slug = itemName.toLowerCase().replace(/\s+/g, '_');

  const terminalSequence = [
    `$ git add objects/${slug}.cfg`,
    `$ git commit -m "feat: acquire ${itemName} from legacy store"`,
    `[main ${Math.random().toString(16).substring(2, 8)}] feat: acquire ${itemName}`,
    ` 1 file changed, 254 insertions(+)`,
    ` create mode 100644 objects/${slug}.cfg`,
    `$ git push origin main`,
    `Enumerating objects: 5, done.`,
    `Counting objects: 100% (5/5), done.`,
    `Delta compression using up to 8 threads`,
    `Compressing objects: 100% (3/3), done.`,
    `Writing objects: 100% (3/3), 452 bytes | 452.00 KiB/s, done.`,
    `Total 3 (delta 0), reused 0 (delta 0)`,
    `To legacy-vault.csgo`,
    `   ${Math.random().toString(16).substring(2, 8)}..${Math.random().toString(16).substring(2, 8)}  main -> main`,
    `# SECURE_TRANSACTION_COMPLETE`
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalSequence.length) {
        setLines(prev => [...prev, terminalSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-sm">
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
          <TerminalIcon size={14} className="text-[#FC2600]" />
          <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Secure Git Bash</span>
          <div className="flex gap-1.5 ml-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
        </div>
        <div className="p-6 h-[300px] overflow-y-auto space-y-1">
          {lines.map((line, i) => (
            <div key={i} className={`${line.startsWith('$') ? 'text-white' : i === terminalSequence.length - 1 ? 'text-[#FC2600] font-bold' : 'text-gray-500'}`}>
              {line}
            </div>
          ))}
          <div className="w-2 h-4 bg-[#FC2600] inline-block animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
};

export default TerminalOverlay;
