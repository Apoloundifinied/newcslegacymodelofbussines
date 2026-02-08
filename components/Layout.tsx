
import React from 'react';
import { User, LogIn, ShoppingCart, Search, Menu, X, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import SecuritySeal from './SecuritySeal';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
  currentUser: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, currentUser, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FC2600] selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setView('home')} className="hover:opacity-80 transition-opacity">
              <Logo className="h-10" />
            </button>
            <div className="hidden lg:block">
              <SecuritySeal />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setView('home')} className={`font-bold uppercase tracking-widest text-sm hover:text-[#FC2600] transition-colors ${currentView === 'home' ? 'text-[#FC2600]' : ''}`}>Home</button>
            <button onClick={() => setView('shop')} className={`font-bold uppercase tracking-widest text-sm hover:text-[#FC2600] transition-colors ${currentView === 'shop' ? 'text-[#FC2600]' : ''}`}>Shop</button>
            
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => setView('admin')} 
                className={`flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:text-[#FC2600] transition-colors ${currentView === 'admin' ? 'text-[#FC2600]' : ''}`}
              >
                <ShieldAlert size={16} />
                <span>Admin</span>
              </button>
            )}

            <div className="h-4 w-[1px] bg-white/20 mx-2" />
            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <button onClick={() => setView('profile')} className="flex items-center gap-2 font-bold hover:text-[#FC2600]">
                    <User size={18} />
                    <span>{currentUser.username}</span>
                  </button>
                  <button onClick={onLogout} className="text-xs uppercase font-bold opacity-50 hover:opacity-100">Logout</button>
                </div>
              ) : (
                <button 
                  onClick={() => setView('auth')}
                  className="flex items-center gap-2 bg-[#FC2600] hover:bg-[#A62B41] px-4 py-2 rounded font-bold transition-all transform hover:scale-105"
                >
                  <LogIn size={18} />
                  <span>SIGN UP</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-2 font-bold">HOME</button>
            <button onClick={() => { setView('shop'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-2 font-bold">SHOP</button>
            {currentUser?.role === 'admin' && (
              <button onClick={() => { setView('admin'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-2 font-bold text-[#FC2600]">ADMIN PANEL</button>
            )}
            <hr className="opacity-10" />
            {currentUser ? (
              <>
                <button onClick={() => { setView('profile'); setIsMobileMenuOpen(false); }} className="block w-full text-left p-2 font-bold">{currentUser.username}</button>
                <button onClick={onLogout} className="block w-full text-left p-2 text-red-500 font-bold">LOGOUT</button>
              </>
            ) : (
              <button onClick={() => { setView('auth'); setIsMobileMenuOpen(false); }} className="block w-full text-center bg-[#FC2600] p-3 rounded font-bold">SIGN UP</button>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8 animate-in fade-in duration-700">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 py-12 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-8 mb-4" />
            <p className="text-gray-400 max-w-sm">
              Providing high-quality modifications for the Global Offensive legacy. Custom HUDs, skins, and configurations since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-[#FC2600]">Marketplace</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => setView('shop')} className="hover:text-white">HUD Modifications</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-white">Skin Changers</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-white">Pro Configs</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-white">Optimization Scripts</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-[#FC2600]">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Installation Guide</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Community Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500 uppercase tracking-widest">
          © 2024 CS:GO Legacy. All Rights Reserved. Not affiliated with Valve Corporation.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
