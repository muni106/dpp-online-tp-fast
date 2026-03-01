import { Product } from '@/data/mockProducts';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ReviewsList = ({ reviews }: { reviews: Product['reviews'] }) => {
  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="bg-card rounded-xl border border-border p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
              {review.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-display font-semibold text-foreground">{review.user}</p>
              <p className="text-[10px] text-muted-foreground">{review.date}</p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn('w-3 h-3', i < review.rating ? 'fill-warning text-warning' : 'text-muted')} />
              ))}
            </div>
          </div>
          <p className="text-xs text-foreground">{review.text}</p>
          <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-sky text-sky-foreground">
            {review.category}
          </span>
        </div>
      ))}
    </div>
  );
};
