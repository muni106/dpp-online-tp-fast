import { MobileLayout } from '@/components/layout/MobileLayout';
import { Gift, Users, Ticket, TrendingUp, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Rewards = () => {
  const rewards = [
    { action: 'Scanned a product', points: '+10', date: 'Today', icon: '📱' },
    { action: 'Recycled Tetra Pak', points: '+20', date: 'Yesterday', icon: '♻️' },
    { action: 'Left a review', points: '+15', date: '2 days ago', icon: '⭐' },
    { action: 'Referred a friend', points: '+50', date: 'Last week', icon: '🤝' },
  ];

  return (
    <MobileLayout>
      <div className="bg-accent px-5 pt-12 pb-8 rounded-b-3xl">
        <h1 className="font-display text-2xl font-extrabold text-accent-foreground mb-1">Rewards</h1>
        <p className="text-sm text-accent-foreground/70 mb-6">Earn points for sustainable actions</p>

        <div className="bg-accent-foreground/10 rounded-2xl p-5 text-center">
          <p className="text-sm text-accent-foreground/70 mb-1">Total Points</p>
          <p className="font-display text-4xl font-extrabold text-accent-foreground">120</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5 text-accent-foreground/70" />
            <span className="text-xs text-accent-foreground/70">+45 this week</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-5">
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Ticket className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-xs font-display font-bold text-foreground">Lottery Tickets</p>
            <p className="text-lg font-display font-extrabold text-foreground">3</p>
            <p className="text-[10px] text-muted-foreground">Exchange 40pts each</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Users className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-xs font-display font-bold text-foreground">Friends Invited</p>
            <p className="text-lg font-display font-extrabold text-foreground">2</p>
            <p className="text-[10px] text-muted-foreground">50pts per friend</p>
          </div>
        </div>

        {/* Refer */}
        <div className="bg-sky/50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-display font-bold text-foreground">Invite Friends</p>
            <p className="text-xs text-muted-foreground">Share your link & earn 50 points each</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Activity */}
        <div>
          <h2 className="font-display font-bold text-base text-foreground mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {rewards.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border p-3 flex items-center gap-3"
              >
                <span className="text-xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">{r.action}</p>
                  <p className="text-[10px] text-muted-foreground">{r.date}</p>
                </div>
                <span className="text-xs font-display font-bold text-success">{r.points}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prize draw */}
        <div className="bg-card rounded-xl border border-border p-4 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-warning" />
            <h2 className="font-display font-bold text-sm text-foreground">Weekly Prize Draw</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Use your lottery tickets for a chance to win sustainable product vouchers!</p>
          <button className="w-full bg-accent text-accent-foreground font-display font-bold py-3 rounded-xl text-sm">
            Enter Draw (1 ticket)
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Rewards;
