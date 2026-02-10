import { JourneyStep } from '@/data/mockProducts';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';

export const JourneyTimeline = ({ steps }: { steps: JourneyStep[] }) => {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              step.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            )}>
              {step.completed ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            </div>
            {i < steps.length - 1 && (
              <div className={cn('w-0.5 h-full min-h-[2rem]', step.completed ? 'bg-success/30' : 'bg-border')} />
            )}
          </div>
          <div className="pb-6">
            <p className="font-display font-semibold text-sm text-foreground">{step.label}</p>
            <p className="text-xs text-muted-foreground">{step.detail}</p>
            {step.date && <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(step.date).toLocaleDateString()}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
