import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { mockProducts, Product } from '@/data/mockProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { ScanLine, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import tetraLogo from '@/assets/tetra-pak-logo.png';

const ScanLanding = () => {
  const navigate = useNavigate();
  const [scannedProducts, setScannedProducts] = useState<Product[]>([mockProducts[0]]);

  const handleScanMore = () => {
    if (scannedProducts.length < mockProducts.length) {
      setScannedProducts(prev => [...prev, mockProducts[prev.length]]);
    }
  };

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <img src={tetraLogo} alt="Tetra Pak" className="h-10 rounded-full" />
          <button
            onClick={() => navigate('/auth')}
            className="text-xs font-medium text-primary-foreground/80 px-3 py-1.5 rounded-full border border-primary-foreground/20"
          >
            Login
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-extrabold text-primary-foreground mb-1">
            Product Passport
          </h1>
          <p className="text-sm text-primary-foreground/70">
            Discover the full story behind your product
          </p>
        </motion.div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Scanned products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-bold text-base text-foreground">
              Scanned Products ({scannedProducts.length})
            </h2>
            {scannedProducts.length >= 2 && (
              <button
                onClick={() => navigate('/compare')}
                className="text-xs text-accent font-semibold flex items-center gap-0.5"
              >
                Compare <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="space-y-3">
            {scannedProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <ProductCard product={product} onClick={() => navigate(`/product/${product.id}`)} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scan more */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleScanMore}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-accent/40 text-accent font-display font-bold text-sm hover:bg-accent/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          Scan another product
        </motion.button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Scan more packs to compare them side by side
        </p>
      </div>
    </MobileLayout>
  );
};

export default ScanLanding;
