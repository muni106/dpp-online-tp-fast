import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { mockProducts } from '@/data/mockProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { Package, Gift, AlertTriangle, Recycle, Zap, Users, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const filters = ['All', 'At Home', 'Consumed', 'Recycled'] as const;

const Home = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>('All');
  const products = mockProducts;

  const shortcuts = [
    { icon: Package, label: 'Product Info', color: 'bg-sky text-sky-foreground' },
    { icon: Zap, label: 'Journey', color: 'bg-mint text-mint-foreground' },
    { icon: Recycle, label: 'Sustainability', color: 'bg-success/10 text-success' },
    { icon: Gift, label: 'Rewards', color: 'bg-accent/10 text-accent', path: '/rewards' },
    { icon: Users, label: 'Community', color: 'bg-secondary text-secondary-foreground', path: '/community' },
    { icon: MessageCircle, label: 'Packy', color: 'bg-primary/10 text-primary' },
  ];

  return (
    <MobileLayout>
      {/* Profile header */}
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-lg">
            JD
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-primary-foreground">Hi, Jane! 👋</h1>
            <p className="text-xs text-primary-foreground/60">Your product dashboard</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Tracked', value: '3', icon: Package },
            { label: 'Rewards', value: '120', icon: Gift },
            { label: 'Expiring', value: '1', icon: AlertTriangle },
          ].map(stat => (
            <div key={stat.label} className="bg-primary-foreground/10 rounded-xl p-3 text-center">
              <stat.icon className="w-4 h-4 text-primary-foreground/70 mx-auto mb-1" />
              <p className="font-display font-extrabold text-lg text-primary-foreground">{stat.value}</p>
              <p className="text-[10px] text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-5">
        {/* 1. My Products with bar-shaped filter tabs */}
        <div>
          <h2 className="font-display font-bold text-base text-foreground mb-3">My Products</h2>
          <div className="flex bg-muted rounded-xl p-1 mb-3">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-display font-bold transition-all',
                  activeFilter === f
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <ProductCard product={product} onClick={() => navigate(`/product/${product.id}`)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Quick Access */}
        <div>
          <h2 className="font-display font-bold text-base text-foreground mb-3">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {shortcuts.map(s => (
              <button
                key={s.label}
                onClick={() => s.path && navigate(s.path)}
                className={cn('rounded-xl p-3 flex flex-col items-center gap-2', s.color)}
              >
                <s.icon className="w-5 h-5" />
                <span className="text-[10px] font-display font-bold">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Recommended Actions (last) */}
        <div className="pb-4">
          <h2 className="font-display font-bold text-base text-foreground mb-3">Recommended Actions</h2>
          <div className="space-y-2">
            <div className="bg-expiring/10 rounded-xl p-3 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-expiring flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">Use orange juice before Friday</p>
                <p className="text-[10px] text-muted-foreground">Expires Feb 15</p>
              </div>
            </div>
            <div className="bg-success/10 rounded-xl p-3 flex items-center gap-3">
              <Recycle className="w-5 h-5 text-success flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">Recycle 2 empty packs today</p>
                <p className="text-[10px] text-muted-foreground">Earn 10 points per pack</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Home;
