
import React from 'react';
import { Activity, Users, Package, GitPullRequest, GitBranch, Terminal, GitMerge } from 'lucide-react';
import { Product } from '../types';

interface AdminDashboardProps {
  products: Product[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-[#FC2600]">Repo Controller</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Management of legacy-market-origin-master</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-gray-500 uppercase">Head Status</div>
            <div className="text-green-500 text-sm font-black uppercase tracking-widest">Main Branch Detached</div>
          </div>
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
            <GitBranch className="text-green-500" size={20} />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Merges', value: '4,281', icon: <GitMerge />, color: 'text-green-400' },
          { label: 'Pull Requests', value: '12', icon: <GitPullRequest />, color: 'text-blue-400' },
          { label: 'Collaborators', value: '1,029', icon: <Users />, color: 'text-[#FC2600]' },
          { label: 'Tracked Objects', value: products.length.toString(), icon: <Package />, color: 'text-purple-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-[#FC2600]/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">{stat.icon}</div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">+2 Commits</span>
            </div>
            <div className="text-2xl font-black italic uppercase">{stat.value}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">Object Blobs (Assets)</h2>
            <button className="text-xs font-bold uppercase tracking-widest text-[#FC2600] border border-[#FC2600]/20 px-3 py-1 rounded hover:bg-[#FC2600]/10">New Object</button>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden font-mono">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-4 font-bold uppercase text-[10px] tracking-widest text-gray-500">HASH</th>
                  <th className="p-4 font-bold uppercase text-[10px] tracking-widest text-gray-500">DESCRIPTOR</th>
                  <th className="p-4 font-bold uppercase text-[10px] tracking-widest text-gray-500">METADATA</th>
                  <th className="p-4 font-bold uppercase text-[10px] tracking-widest text-gray-500">STAGED</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-xs text-gray-500">0x{Math.random().toString(16).substring(2, 8)}</td>
                    <td className="p-4 font-bold text-white uppercase italic">{p.name}</td>
                    <td className="p-4"><span className="text-[8px] px-2 py-0.5 bg-white/10 rounded uppercase text-gray-300">{p.category}</span></td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase text-green-500">Deployed</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Git Logs */}
        <div className="space-y-4">
          <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <Terminal size={18} className="text-[#FC2600]" />
            Git Log Output
          </h2>
          <div className="bg-black border border-white/10 rounded-xl p-4 font-mono text-[10px] h-[400px] overflow-y-auto space-y-1 custom-scrollbar">
            <div className="text-yellow-500">commit 3e1a2b4f2a1d (HEAD -> main)</div>
            <div className="text-white">Author: admin@legacy.com</div>
            <div className="text-white mb-2">Date:   {new Date().toLocaleString()}</div>
            <div className="text-blue-400 pl-4 mb-4">feat: initialize security_gate_v2.ts</div>

            <div className="text-yellow-500 opacity-70">commit f0d4e5a2c3b1</div>
            <div className="text-white opacity-70">Author: admin@legacy.com</div>
            <div className="text-blue-400 pl-4 mb-4 opacity-70">fix: patch buffer overflow in skin_cache.dll</div>

            <div className="text-[#FC2600] font-bold"> * (Merge) hotfix/transaction_error -> main</div>
            <div className="text-white/30"> | \</div>
            <div className="text-white/30"> |  * commit a9b8c7d6e5f4</div>
            <div className="text-white/30"> | /  Author: bot@security.audit</div>
            <div className="text-white/30 mb-4"> |    audit: passing automated checks for build 482</div>

            <div className="text-green-500 animate-pulse mt-10">_ [READY] Remote repository synchronized.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
