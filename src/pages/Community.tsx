import { MobileLayout } from '@/components/layout/MobileLayout';
import { ReviewsList } from '@/components/product/ReviewsList';
import { mockProducts } from '@/data/mockProducts';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Send } from 'lucide-react';

const filters = ['Most helpful', 'Newest', 'Taste', 'Sustainability', 'Packaging'] as const;

const Community = () => {
  const allReviews = mockProducts.flatMap(p => p.reviews.map(r => ({ ...r, productName: p.name })));
  const [activeFilter, setActiveFilter] = useState<string>('Newest');

  return (
    <MobileLayout>
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-display text-2xl font-extrabold text-foreground mb-1">Community</h1>
        <p className="text-sm text-muted-foreground mb-4">See what others say about these products</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-4">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-display font-bold whitespace-nowrap transition-colors',
              activeFilter === f ? 'bg-accent text-accent-foreground' : 'bg-card text-muted-foreground border border-border'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-4">
        {/* Write review */}
        <div className="bg-card rounded-xl border border-border p-3">
          <p className="text-xs font-display font-bold text-foreground mb-2">Share your experience</p>
          <div className="flex gap-2">
            <textarea
              placeholder="What do you think about this product?"
              className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground resize-none h-16 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <div className="flex flex-col gap-1.5">
              <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Camera className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 italic">
            💚 Your feedback helps improve products and sustainability
          </p>
        </div>

        <ReviewsList reviews={allReviews} />
      </div>
    </MobileLayout>
  );
};

export default Community;
