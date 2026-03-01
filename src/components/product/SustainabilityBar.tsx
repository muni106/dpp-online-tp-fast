import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Leaf, Droplets, TreePine, Heart, Package } from 'lucide-react';

interface SustainabilityBarProps {
  data: { co2: number; recyclability: number; animalWelfare: number; localSourcing: number; packaging: number };
}

const segments = [
  {
    key: 'co2' as const,
    label: 'CO₂ Emissions',
    icon: '🌍',
    LucideIcon: Leaf,
    getImpact: (val: number) => {
      const saved = Math.round((val / 100) * 0.8 * 10) / 10;
      return {
        headline: `${saved} kg CO₂ saved per litre`,
        story: val >= 80
          ? `This product's carbon footprint is ${100 - val}% lower than conventional alternatives — equivalent to driving ${Math.round((100 - val) * 0.04)} fewer km by car.`
          : val >= 60
          ? `Moderate emissions. Choosing this over a conventional product still saves roughly ${Math.round(val * 0.003)} trees worth of CO₂ per year.`
          : `Higher emissions than average. Consider offsetting by choosing local transport or reducing other high-carbon foods this week.`,
        badge: val >= 80 ? '🌱 Carbon Champion' : val >= 60 ? '🌿 Making Progress' : '⚡ Room to Improve',
      };
    },
  },
  {
    key: 'recyclability' as const,
    label: 'Recyclability',
    icon: '♻️',
    LucideIcon: Droplets,
    getImpact: (val: number) => {
      return {
        headline: `${val}% of packaging is recyclable`,
        story: val >= 80
          ? `Tetra Pak cartons are made of 70% paperboard from FSC-certified forests. Recycling this pack saves enough energy to power a phone for ${Math.round(val * 0.3)} hours.`
          : val >= 60
          ? `Most of this packaging can be recycled. Rinsing and flattening the carton before recycling boosts recovery rates by up to 40%.`
          : `Lower recyclability score. Look for local recycling programs — even partially recyclable packs divert waste from landfill.`,
        badge: val >= 80 ? '♻️ Fully Circular' : val >= 60 ? '🔄 Mostly Recyclable' : '📦 Partially Recyclable',
      };
    },
  },
  {
    key: 'animalWelfare' as const,
    label: 'Animal Welfare',
    icon: '🐄',
    LucideIcon: Heart,
    getImpact: (val: number) => {
      return {
        headline: val === 100 ? 'No animal products used' : `Welfare score: ${val}/100`,
        story: val === 100
          ? `This product contains no animal-derived ingredients. Choosing plant-based options like this saves approximately 1,000 litres of water compared to dairy equivalents.`
          : val >= 80
          ? `Animals involved in production are raised under high-welfare standards — free-range, grass-fed, or certified humane. Their quality of life directly impacts the quality of your food.`
          : `Standard welfare practices apply. Choosing higher-welfare certified products encourages farmers to adopt better standards industry-wide.`,
        badge: val === 100 ? '🌿 100% Plant-Based' : val >= 80 ? '💚 High Welfare' : '🐾 Standard Care',
      };
    },
  },
  {
    key: 'localSourcing' as const,
    label: 'Local Sourcing',
    icon: '📍',
    LucideIcon: TreePine,
    getImpact: (val: number) => {
      const kmSaved = Math.round((val / 100) * 2400);
      return {
        headline: `Sourced within ~${Math.round((100 - val) * 30 + 50)} km`,
        story: val >= 80
          ? `By sourcing locally, this product avoided approximately ${kmSaved} km of transport — supporting regional farmers and cutting freight emissions significantly.`
          : val >= 60
          ? `Ingredients travel a moderate distance. Local sourcing still supports regional economies and reduces cold-chain energy use compared to global supply chains.`
          : `Long supply chain. Ingredients cross borders, increasing transport emissions. This product offset this with other sustainability investments.`,
        badge: val >= 80 ? '🏡 Hyper-Local' : val >= 60 ? '🗺️ Regional' : '✈️ Global Sourced',
      };
    },
  },
  {
    key: 'packaging' as const,
    label: 'Packaging',
    icon: '📦',
    LucideIcon: Package,
    getImpact: (val: number) => {
      return {
        headline: `Packaging score: ${val}/100`,
        story: val >= 80
          ? `Tetra Pak cartons use 94% renewable or recycled materials. This pack's design reduces material use by ${Math.round((val - 60) * 0.8)}% vs. plastic bottles of the same size.`
          : val >= 60
          ? `Packaging is designed to minimise waste. The carton is lightweight, reducing transport emissions, and is accepted by most municipal recycling programmes.`
          : `Packaging could be improved. The manufacturer is working toward a 2030 target of fully renewable materials across all product lines.`,
        badge: val >= 80 ? '🏆 Eco Packaging' : val >= 60 ? '📋 Responsible Pack' : '🔧 Being Improved',
      };
    },
  },
];

function getColor(val: number) {
  if (val >= 80) return 'bg-fresh';
  if (val >= 60) return 'bg-expiring';
  return 'bg-expired';
}

function getTextColor(val: number) {
  if (val >= 80) return 'text-fresh';
  if (val >= 60) return 'text-expiring';
  return 'text-expired';
}

export const SustainabilityBar = ({ data }: SustainabilityBarProps) => {
  const avg = Math.round(Object.values(data).reduce((a, b) => a + b, 0) / 5);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const toggle = (key: string) => setExpandedKey(prev => (prev === key ? null : key));

  return (
    <div className="space-y-4">
      {/* Overall score card */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-base text-foreground">Sustainability Score</h3>
            <p className="text-xs text-muted-foreground">Based on 5 ethical pillars</p>
          </div>
          <div className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center border-4',
            avg >= 80 ? 'border-fresh bg-fresh/10' : avg >= 60 ? 'border-expiring bg-expiring/10' : 'border-expired bg-expired/10'
          )}>
            <span className={cn('text-lg font-extrabold font-display', getTextColor(avg))}>{avg}%</span>
          </div>
        </div>

        {/* Segmented bar */}
        <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-2">
          {segments.map((seg) => (
            <div
              key={seg.key}
              className={cn('flex-1 rounded-full', getColor(data[seg.key]))}
              style={{ opacity: 0.3 + (data[seg.key] / 100) * 0.7 }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {segments.map(seg => (
            <span key={seg.key} className="text-base">{seg.icon}</span>
          ))}
        </div>

        {/* Summary message */}
        <div className={cn(
          'mt-4 rounded-xl p-3 text-xs',
          avg >= 80 ? 'bg-fresh/10 text-fresh' : avg >= 60 ? 'bg-expiring/10 text-expiring' : 'bg-expired/10 text-expired'
        )}>
          {avg >= 80
            ? '🌟 This product is among the top 15% most sustainable in its category. Your choice makes a real difference!'
            : avg >= 60
            ? '👍 A responsible choice. This product performs above average across most sustainability pillars.'
            : '💡 There\'s room to grow. See each category below to understand where improvements can be made.'}
        </div>
      </div>

      {/* Per-category cards with expandable impact */}
      <div className="space-y-3">
        {segments.map((seg) => {
          const val = data[seg.key];
          const impact = seg.getImpact(val);
          const isOpen = expandedKey === seg.key;

          return (
            <div key={seg.key} className="bg-card rounded-2xl border border-border overflow-hidden">
              <button
                className="w-full p-4 flex items-center gap-3 text-left"
                onClick={() => toggle(seg.key)}
              >
                <span className="text-xl flex-shrink-0">{seg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-display font-bold text-foreground">{seg.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs font-bold', getTextColor(val))}>{val}%</span>
                      <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform flex-shrink-0', isOpen && 'rotate-180')} />
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={cn('h-full rounded-full', getColor(val))}
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 space-y-3">
                      <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold',
                        val >= 80 ? 'bg-fresh/15 text-fresh' : val >= 60 ? 'bg-expiring/15 text-expiring' : 'bg-expired/15 text-expired'
                      )}>
                        {impact.badge}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{impact.headline}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{impact.story}</p>

                      {/* Visual impact metric */}
                      <div className="bg-muted rounded-xl p-3 flex items-center gap-3">
                        <seg.LucideIcon className={cn('w-6 h-6 flex-shrink-0', getTextColor(val))} />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Your impact this month</p>
                          <p className="text-xs font-bold text-foreground">
                            {seg.key === 'co2' && `~${Math.round(val * 0.012 * 4) / 10} kg CO₂ avoided`}
                            {seg.key === 'recyclability' && `${Math.round(val / 10)} packs fully recovered`}
                            {seg.key === 'animalWelfare' && val === 100 ? '0 animal products consumed' : `Supported ethical farming`}
                            {seg.key === 'localSourcing' && `~${Math.round(val * 18)} km of freight skipped`}
                            {seg.key === 'packaging' && `~${Math.round(val * 0.3)}g less plastic vs. alternatives`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer tip */}
      <div className="bg-sky rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div>
          <p className="font-display font-bold text-sm text-sky-foreground">Did you know?</p>
          <p className="text-xs text-sky-foreground/80 mt-0.5">
            Switching from conventional to sustainable packaged products for one year can save the equivalent of 120 kg of CO₂ — the same as planting 6 trees.
          </p>
        </div>
      </div>
    </div>
  );
};
