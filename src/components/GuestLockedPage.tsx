import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Sparkles, Gift, BarChart2, Users, Home, Star, Leaf } from 'lucide-react';
import { MobileLayout } from './layout/MobileLayout';

const features = [
  { icon: Home, label: 'Personal Dashboard', desc: 'Track all your scanned products in one place', color: 'bg-sky text-sky-foreground' },
  { icon: BarChart2, label: 'Journey Tracking', desc: 'See the full farm-to-table story of every product', color: 'bg-mint text-mint-foreground' },
  { icon: Gift, label: 'Rewards & Points', desc: 'Earn points for recycling and sustainable choices', color: 'bg-accent/10 text-accent' },
  { icon: Users, label: 'Community', desc: 'Share reviews and connect with eco-conscious shoppers', color: 'bg-secondary text-secondary-foreground' },
  { icon: Leaf, label: 'Eco Impact Reports', desc: 'See your personal carbon footprint and savings', color: 'bg-success/10 text-success' },
  { icon: Star, label: 'Personalised Picks', desc: 'AI-powered product recommendations just for you', color: 'bg-primary/10 text-primary' },
];

export const GuestLockedPage = ({ pageName }: { pageName: string }) => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary px-5 pt-14 pb-10 rounded-b-3xl">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-secondary/30 blur-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-5 shadow-lg"
          >
            <Lock className="w-9 h-9 text-accent-foreground" />
          </motion.div>
          <h1 className="font-display text-2xl font-extrabold text-primary-foreground mb-2">
            Unlock {pageName}
          </h1>
          <p className="text-sm text-primary-foreground/70 max-w-xs mx-auto">
            Sign in or create a free account to access this feature and discover a world of sustainable choices.
          </p>
        </motion.div>
      </div>

      <div className="px-4 py-6 space-y-5">
        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/auth')}
            className="flex-1 bg-accent text-accent-foreground font-display font-bold py-3.5 rounded-xl text-sm shadow-md hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="flex-1 bg-card border border-border text-foreground font-display font-bold py-3.5 rounded-xl text-sm hover:bg-muted transition-colors"
          >
            Create Account
          </button>
        </div>

        {/* What's inside */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="font-display font-bold text-base text-foreground">What you'll get access to</h2>
          </div>
          <div className="space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-foreground">{f.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust badge */}
        <div className="bg-mint/40 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🌍</span>
          <div>
            <p className="font-display font-bold text-sm text-foreground">Join 50,000+ eco-conscious consumers</p>
            <p className="text-xs text-muted-foreground">Free forever · No credit card required · Cancel anytime</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
