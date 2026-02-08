
import React from 'react';
import { GitCommit, Star, Download } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPurchase: (id: string) => void;
  isPurchased?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase, isPurchased }) => {
  return (
    <div className="group bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-[#FC2600]/50 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter text-[#FC2600] border border-[#FC2600]/20">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-[#FC2600] transition-colors">{product.name}</h3>
          <div className="flex items-center text-yellow-500 gap-1">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-black italic">
            ${product.price === 0 ? 'FREE' : product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => onPurchase(product.id)}
            disabled={isPurchased}
            className={`flex items-center gap-2 px-4 py-2 rounded font-bold text-xs uppercase transition-all transform active:scale-95 ${
              isPurchased 
                ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
                : 'bg-[#FC2600] hover:bg-[#A62B41] text-white shadow-lg shadow-[#FC2600]/20'
            }`}
          >
            {isPurchased ? (
              <>
                <Download size={14} />
                <span>COMMITTED</span>
              </>
            ) : (
              <>
                <GitCommit size={14} />
                <span>STAGE & COMMIT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
