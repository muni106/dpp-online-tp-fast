import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { mockProducts, Product } from '@/data/mockProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { ScanLine, Plus, ChevronRight, MapPin, Zap, Recycle, Leaf, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import tetraLogo from '@/assets/tetra-pak-logo.png';
import milkImg from '@/assets/milk-carton-1.png';
import juiceImg from '@/assets/juice-carton-1.png';
import oatImg from '@/assets/oat-milk-carton.png';

const imageMap: Record<string, string> = {
  'milk-carton-1': milkImg,
  'juice-carton-1': juiceImg,
  'oat-milk-carton': oatImg,
};

const comparisonCategories = [
  { key: 'origin', label: 'Origin', icon: MapPin, render: (p: Product) => `${p.origin.region}, ${p.origin.country}` },
  { key: 'status', label: 'Status', icon: Zap, render: (p: Product) => p.status.charAt(0).toUpperCase() + p.status.slice(1) },
  { key: 'organic', label: 'Organic', icon: Leaf, render: (p: Product) => p.organic ? '✅ Yes' : '❌ No' },
  { key: 'expiry', label: 'Expiry', icon: Calendar, render: (p: Product) => new Date(p.expiry).toLocaleDateString() },
  { key: 'eco', label: 'Eco Score', icon: Recycle, render: (p: Product) => `${Math.round(Object.values(p.sustainability).reduce((a, b) => a + b, 0) / 5)}%` },
  { key: 'recyclability', label: 'Recyclability', icon: Recycle, render: (p: Product) => `${p.sustainability.recyclability}%` },
];

const ScanLanding = () => {
  const navigate = useNavigate();
  const [scannedProducts, setScannedProducts] = useState<Product[]>([mockProducts[0]]);
  const [focusIndex, setFocusIndex] = useState(0);

  const handleScanMore = () => {
    if (scannedProducts.length < mockProducts.length) {
      setScannedProducts(prev => [...prev, mockProducts[prev.length]]);
    }
  };

  const showComparison = scannedProducts.length >= 2;

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-primary px-5 pt-12 pb-6 rounded-b-3xl">
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

      <div className="px-4 pt-5 space-y-4">
        {/* Scanned products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-bold text-base text-foreground">
              Scanned Products ({scannedProducts.length})
            </h2>
            {showComparison && (
              <button
                onClick={() => navigate('/compare')}
                className="text-xs text-accent font-semibold flex items-center gap-0.5"
              >
                Full Compare <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
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

        <p className="text-center text-xs text-muted-foreground">
          Scan more packs to compare them side by side
        </p>

        {/* Inline comparison when 2+ products */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-3 pb-4"
            >
              <h2 className="font-display font-bold text-base text-foreground">Quick Comparison</h2>

              {/* Swipeable product focus selector */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {scannedProducts.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setFocusIndex(i)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-xl border min-w-fit transition-all',
                      focusIndex === i
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-card'
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <img src={imageMap[p.image]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-display font-bold text-foreground">{p.name}</span>
                  </button>
                ))}
              </div>

              {/* Category rows with vertical alignment */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {comparisonCategories.map((cat, ci) => {
                  const values = scannedProducts.map(p => cat.render(p));
                  const focusVal = values[focusIndex];
                  return (
                    <div
                      key={cat.key}
                      className={cn(
                        'flex items-stretch',
                        ci > 0 && 'border-t border-border'
                      )}
                    >
                      {/* Label column */}
                      <div className="w-28 flex-shrink-0 p-3 flex items-center gap-2 bg-muted/50">
                        <cat.icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{cat.label}</span>
                      </div>
                      {/* Values */}
                      <div className="flex-1 flex">
                        {scannedProducts.map((p, pi) => {
                          const val = values[pi];
                          const isDiff = val !== focusVal;
                          return (
                            <div
                              key={p.id}
                              className={cn(
                                'flex-1 p-3 flex items-center justify-center text-center',
                                pi > 0 && 'border-l border-border',
                                pi === focusIndex && 'bg-accent/5',
                                isDiff && pi !== focusIndex && 'bg-warning/5'
                              )}
                            >
                              <span className={cn(
                                'text-xs font-medium',
                                isDiff && pi !== focusIndex ? 'text-warning-foreground font-bold' : 'text-foreground'
                              )}>
                                {val}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
};

export default ScanLanding;
