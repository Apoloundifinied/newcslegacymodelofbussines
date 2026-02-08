
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Entrance from './components/Entrance';
import AuthForm from './components/AuthForm';
import ProductCard from './components/ProductCard';
import AdminDashboard from './components/AdminDashboard';
import AdminGate from './components/AdminGate';
import TerminalOverlay from './components/TerminalOverlay';
import { Product, View, User as UserType, Category } from './types';
import { Sparkles, Zap, Shield, TrendingUp, GitBranch, Download, Lock } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NeoHUD Pro V2',
    category: 'HUD',
    description: 'Clean, minimalist HUD inspired by modern esports tournaments. High visibility and custom animations.',
    price: 9.99,
    imageUrl: 'https://picsum.photos/seed/hud1/800/450',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Carbon Skin Pack',
    category: 'Skin Change',
    description: 'Ultra-realistic carbon fiber finishes for all primary rifles. Optimized for high FPS.',
    price: 14.99,
    imageUrl: 'https://picsum.photos/seed/skin1/800/450',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Legacy Movement Script',
    category: 'Scripts',
    description: 'Enhanced bunnyhopping and air-strafing logic for the legacy engine. Purely aesthetic/practice tool.',
    price: 4.99,
    imageUrl: 'https://picsum.photos/seed/script1/800/450',
    rating: 4.5
  },
  {
    id: '4',
    name: 'S1mple Config 2024',
    category: 'Config',
    description: 'The exact professional configuration used by the GOAT. Includes autoexec and launch options.',
    price: 0.00,
    imageUrl: 'https://picsum.photos/seed/config1/800/450',
    rating: 5.0
  },
  {
    id: '5',
    name: 'Aesthetic Radar+',
    category: 'HUD',
    description: 'High-definition radar maps with player location callouts built directly into the UI.',
    price: 5.99,
    imageUrl: 'https://picsum.photos/seed/hud2/800/450',
    rating: 4.7
  },
  {
    id: '6',
    name: 'Prism Knife Set',
    category: 'Skin Change',
    description: 'A collection of color-shifting iridescent finishes for Karambit and Butterfly knives.',
    price: 19.99,
    imageUrl: 'https://picsum.photos/seed/skin2/800/450',
    rating: 4.9
  }
];

const App: React.FC = () => {
  const [showEntrance, setShowEntrance] = useState(true);
  const [view, setView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminGate, setShowAdminGate] = useState(false);
  const [committingProduct, setCommittingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('csgo_active_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (view !== 'admin') {
      setIsAdminAuthenticated(false);
    }
  }, [view]);

  const handleAuth = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('csgo_active_user', JSON.stringify(user));
    setView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('csgo_active_user');
    setIsAdminAuthenticated(false);
    setView('home');
  };

  const navigateToView = (newView: View) => {
    if (newView === 'admin' && !isAdminAuthenticated) {
      setShowAdminGate(true);
    } else {
      setView(newView);
    }
  };

  const handleAdminSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminGate(false);
    setView('admin');
  };

  const handlePurchase = (id: string) => {
    if (!currentUser) {
      setView('auth');
      return;
    }
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (product) {
      setCommittingProduct(product);
    }
  };

  const finalizePurchase = () => {
    if (!currentUser || !committingProduct) return;

    const updatedUser = {
      ...currentUser,
      purchasedItems: [...currentUser.purchasedItems, committingProduct.id]
    };
    setCurrentUser(updatedUser);
    
    const users = JSON.parse(localStorage.getItem('csgo_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
    if (userIndex > -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('csgo_users', JSON.stringify(users));
      localStorage.setItem('csgo_active_user', JSON.stringify(updatedUser));
    }
    
    setCommittingProduct(null);
  };

  if (showEntrance) {
    return <Entrance onFinish={() => setShowEntrance(false)} />;
  }

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <Layout currentView={view} setView={navigateToView} currentUser={currentUser} onLogout={handleLogout}>
      {showAdminGate && (
        <AdminGate 
          onSuccess={handleAdminSuccess} 
          onCancel={() => setShowAdminGate(false)} 
        />
      )}

      {committingProduct && (
        <TerminalOverlay 
          itemName={committingProduct.name} 
          onComplete={finalizePurchase} 
        />
      )}

      {view === 'home' && (
        <div className="space-y-20">
          <section className="relative rounded-3xl overflow-hidden py-20 px-8 md:px-16 border border-white/10 bg-[#050505] shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#FC2600]/10 blur-[100px] rounded-full" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FC2600]/20 border border-[#FC2600]/30 rounded-full text-[#FC2600] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                <span>Legacy Support Live</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
                EVOLVE YOUR <br />
                <span className="text-[#FC2600]">LEGACY REPO</span>
              </h1>
              <p className="text-gray-400 text-lg mb-10 max-w-lg">
                Premium modifications delivered via secure commit. Pull the latest HUDs, skin blobs, and tactical configurations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigateToView('shop')}
                  className="bg-[#FC2600] hover:bg-[#A62B41] px-8 py-4 rounded font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl shadow-[#FC2600]/20"
                >
                  Explore Repo
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded font-black uppercase tracking-widest transition-all">
                  Documentation
                </button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-[#FC2600] rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Delta Sync</h3>
              <p className="text-gray-400 text-sm">Our assets use delta compression to minimize impact on game load times and system registry.</p>
            </div>
            <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-[#FC2600] rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">PGP Verified</h3>
              <p className="text-gray-400 text-sm">Every commit to our master branch is signed and verified by our senior security architects.</p>
            </div>
            <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-[#FC2600] rounded-lg flex items-center justify-center mb-6">
                <GitBranch className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Version Control</h3>
              <p className="text-gray-400 text-sm">Easy rollback to previous configurations. Keep your setup stable across client updates.</p>
            </div>
          </section>
        </div>
      )}

      {view === 'shop' && (
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Master Repository</h1>
            <p className="text-gray-400 uppercase text-xs tracking-[0.3em] font-bold">Stage your next upgrade</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {['All', 'HUD', 'Skin Change', 'Config', 'Scripts'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all border ${
                  activeCategory === cat 
                    ? 'bg-[#FC2600] border-[#FC2600] text-white shadow-lg shadow-[#FC2600]/20' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onPurchase={handlePurchase} 
                isPurchased={currentUser?.purchasedItems.includes(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {view === 'admin' && isAdminAuthenticated && currentUser?.role === 'admin' && (
        <AdminDashboard products={MOCK_PRODUCTS} />
      )}

      {view === 'auth' && (
        <div className="py-20">
          <AuthForm onAuth={handleAuth} />
        </div>
      )}

      {view === 'profile' && currentUser && (
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-[#FC2600] rounded-full flex items-center justify-center text-4xl font-black uppercase italic shadow-2xl shadow-[#FC2600]/20">
              {currentUser.username.substring(0, 2)}
            </div>
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">{currentUser.username}</h1>
              <p className="text-gray-500 font-bold">{currentUser.email}</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-green-600/20 text-green-400 text-[10px] font-black px-2 py-1 rounded uppercase border border-green-600/30">Contributor Tier</span>
                <span className="bg-[#FC2600]/10 text-[#FC2600] text-[10px] font-black px-2 py-1 rounded uppercase border border-[#FC2600]/20 italic">{currentUser.role} Status</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Lock size={24} className="text-[#FC2600]" />
              Local Repository (HEAD)
            </h2>
            {currentUser.purchasedItems.length > 0 ? (
              <div className="bg-black border border-white/5 rounded-xl overflow-hidden font-mono text-sm">
                 <div className="bg-white/5 p-4 border-b border-white/5 text-[10px] uppercase font-bold text-gray-400 flex justify-between">
                   <span>Tracked Files</span>
                   <span>Last Push: {new Date().toLocaleDateString()}</span>
                 </div>
                 {currentUser.purchasedItems.map((id, index) => {
                  const product = MOCK_PRODUCTS.find(p => p.id === id);
                  if (!product) return null;
                  return (
                    <div key={id} className="p-4 border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">0x{id.padStart(4, '0')}</span>
                        <span className="text-[#FC2600] font-black italic uppercase tracking-widest">{product.name}</span>
                        <span className="hidden md:inline text-[8px] bg-white/10 px-2 py-0.5 rounded text-gray-400">{product.category}</span>
                      </div>
                      <button className="text-[10px] font-black uppercase text-green-500 hover:text-green-400 flex items-center gap-1 bg-green-500/10 px-3 py-1.5 rounded border border-green-500/20">
                        <Download size={10} />
                        git pull origin
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-gray-400 font-bold uppercase tracking-widest mb-4">No assets tracked in local repo.</p>
                <button onClick={() => navigateToView('shop')} className="text-[#FC2600] font-black uppercase text-sm hover:underline">Sync Master Repo</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
