import { cn } from '@/lib/utils';

interface SustainabilityBarProps {
  data: { co2: number; recyclability: number; animalWelfare: number; localSourcing: number; packaging: number };
}

const segments = [
  { key: 'co2' as const, label: 'CO₂', icon: '🌍' },
  { key: 'recyclability' as const, label: 'Recyclability', icon: '♻️' },
  { key: 'animalWelfare' as const, label: 'Animal Welfare', icon: '🐄' },
  { key: 'localSourcing' as const, label: 'Local Sourcing', icon: '📍' },
  { key: 'packaging' as const, label: 'Packaging', icon: '📦' },
];

function getColor(val: number) {
  if (val >= 80) return 'bg-fresh';
  if (val >= 60) return 'bg-expiring';
  return 'bg-expired';
}

export const SustainabilityBar = ({ data }: SustainabilityBarProps) => {
  const avg = Math.round(Object.values(data).reduce((a, b) => a + b, 0) / 5);

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-sm text-foreground">Sustainability Score</h3>
        <span className={cn(
          'text-sm font-bold px-2.5 py-0.5 rounded-full',
          avg >= 80 ? 'bg-fresh/10 text-fresh' : avg >= 60 ? 'bg-expiring/10 text-expiring' : 'bg-expired/10 text-expired'
        )}>
          {avg}%
        </span>
      </div>

      <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-4">
        {segments.map((seg) => (
          <div key={seg.key} className={cn('flex-1 rounded-full', getColor(data[seg.key]))} style={{ opacity: 0.3 + (data[seg.key] / 100) * 0.7 }} />
        ))}
      </div>

      <div className="space-y-2">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center gap-2">
            <span className="text-sm">{seg.icon}</span>
            <span className="text-xs text-muted-foreground flex-1">{seg.label}</span>
            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full', getColor(data[seg.key]))} style={{ width: `${data[seg.key]}%` }} />
            </div>
            <span className="text-xs font-medium text-foreground w-8 text-right">{data[seg.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
