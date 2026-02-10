import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '@/data/mockProducts';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { JourneyTimeline } from '@/components/product/JourneyTimeline';
import { SustainabilityBar } from '@/components/product/SustainabilityBar';
import { ReviewsList } from '@/components/product/ReviewsList';
import { ArrowLeft, ShieldCheck, Leaf, MapPin, Calendar, ChevronDown, Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import milkImg from '@/assets/milk-carton-1.png';
import juiceImg from '@/assets/juice-carton-1.png';
import oatImg from '@/assets/oat-milk-carton.png';

const imageMap: Record<string, string> = {
  'milk-carton-1': milkImg,
  'juice-carton-1': juiceImg,
  'oat-milk-carton': oatImg,
};

type Tab = 'info' | 'journey' | 'sustainability' | 'community';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [showLabel, setShowLabel] = useState(false);

  if (!product) return <div className="p-8 text-center text-muted-foreground">Product not found</div>;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'info', label: 'Info' },
    { key: 'journey', label: 'Journey' },
    { key: 'sustainability', label: 'Eco' },
    { key: 'community', label: 'Reviews' },
  ];

  return (
    <MobileLayout>
      {/* Hero */}
      <div className="bg-sky/30 px-4 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="mb-4 p-2 -ml-2 rounded-full hover:bg-card/50">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-card flex items-center justify-center overflow-hidden shadow-sm">
            <img src={imageMap[product.image]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold text-foreground">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.brand} · {product.volume}</p>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {product.organic && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-mint text-mint-foreground font-medium flex items-center gap-0.5">
                  <Leaf className="w-2.5 h-2.5" /> Organic
                </span>
              )}
              {product.certifications.slice(0, 2).map(c => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-sky text-sky-foreground font-medium">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex px-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex-1 py-3 text-xs font-display font-bold text-center border-b-2 transition-colors',
                activeTab === tab.key ? 'border-accent text-accent' : 'border-transparent text-muted-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {activeTab === 'info' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Quick info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl border border-border p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] text-muted-foreground">Origin</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{product.origin.region}, {product.origin.country}</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] text-muted-foreground">Expiry</span>
                </div>
                <p className="text-xs font-semibold text-foreground">{new Date(product.expiry).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Anti-counterfeit */}
            <div className="bg-mint/30 rounded-xl p-3 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-success flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-foreground">✅ Verified Authentic</p>
                <p className="text-[10px] text-muted-foreground">Batch: {product.batch} · Serial: {product.serial}</p>
              </div>
            </div>

            {/* Digital label toggle */}
            <button onClick={() => setShowLabel(!showLabel)} className="w-full bg-card rounded-xl border border-border p-3 flex items-center justify-between">
              <span className="text-sm font-display font-bold text-foreground">📋 Digital Label</span>
              <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', showLabel && 'rotate-180')} />
            </button>

            <AnimatePresence>
              {showLabel && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Ingredients</p>
                      <p className="text-xs text-foreground">{product.ingredients}</p>
                    </div>
                    {product.allergens.length > 0 && (
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Allergens</p>
                        <div className="flex gap-1">
                          {product.allergens.map(a => (
                            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-expired/10 text-expired font-medium">⚠️ {a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Nutrition (per 100ml)</p>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(product.nutrition).map(([k, v]) => (
                          <div key={k} className="text-center bg-muted rounded-lg p-2">
                            <p className="text-[10px] text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="text-xs font-bold text-foreground">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recycling */}
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <Recycle className="w-5 h-5 text-success" />
                <h3 className="font-display font-bold text-sm text-foreground">Recycling Guide</h3>
              </div>
              <div className="space-y-2">
                {['Flatten the carton', 'Remove the cap', 'Place in paper/carton recycling', 'Cap goes in plastic recycling'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-success/10 text-success text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-xs text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'journey' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <JourneyTimeline steps={product.journey} />
          </motion.div>
        )}

        {activeTab === 'sustainability' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SustainabilityBar data={product.sustainability} />
          </motion.div>
        )}

        {activeTab === 'community' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-foreground">Reviews ({product.reviews.length})</h3>
              <button className="text-xs text-accent font-semibold">Write a review</button>
            </div>
            <ReviewsList reviews={product.reviews} />
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};

export default ProductDetail;
