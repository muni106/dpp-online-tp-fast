import { Product } from '@/data/mockProducts';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import milkImg from '@/assets/milk-carton-1.png';
import juiceImg from '@/assets/juice-carton-1.png';
import oatImg from '@/assets/oat-milk-carton.png';

const imageMap: Record<string, string> = {
  'milk-carton-1': milkImg,
  'juice-carton-1': juiceImg,
  'oat-milk-carton': oatImg,
};

function getExpiryColor(status: Product['status']) {
  switch (status) {
    case 'fresh': return 'bg-fresh/10 text-fresh border-fresh/20';
    case 'expiring': return 'bg-expiring/10 text-expiring border-expiring/20';
    case 'expired': return 'bg-expired/10 text-expired border-expired/20';
    case 'consumed': return 'bg-primary/10 text-primary border-primary/20';
    case 'recycled': return 'bg-success/10 text-success border-success/20';
  }
}

function getStatusLabel(status: Product['status']) {
  switch (status) {
    case 'fresh': return '🟢 Fresh';
    case 'expiring': return '🟡 Expires soon';
    case 'expired': return '🔴 Expired';
    case 'consumed': return '✅ Consumed';
    case 'recycled': return '♻️ Recycled';
  }
}

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  onClick?: () => void;
}

export const ProductCard = ({ product, compact, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card rounded-2xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer',
        compact && 'p-3'
      )}
    >
      <div className="flex gap-3">
        <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
          <img src={imageMap[product.image]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-sm text-foreground truncate">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{product.brand} · {product.volume}</p>
          <div className="flex flex-wrap gap-1.5">
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', getExpiryColor(product.status))}>
              {getStatusLabel(product.status)}
            </span>
            {product.organic && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-mint text-mint-foreground font-medium flex items-center gap-0.5">
                <Leaf className="w-2.5 h-2.5" /> Organic
              </span>
            )}
          </div>
        </div>
      </div>
      {!compact && (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" /> {product.origin.country}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" /> Exp: {new Date(product.expiry).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};
