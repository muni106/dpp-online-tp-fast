import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { mockProducts } from '@/data/mockProducts';
import { ArrowLeft, Leaf, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import milkImg from '@/assets/milk-carton-1.png';
import juiceImg from '@/assets/juice-carton-1.png';
import oatImg from '@/assets/oat-milk-carton.png';

const imageMap: Record<string, string> = {
  'milk-carton-1': milkImg,
  'juice-carton-1': juiceImg,
  'oat-milk-carton': oatImg,
};

const Compare = () => {
  const navigate = useNavigate();
  const products = mockProducts;

  const rows = [
    { label: 'Origin', render: (p: typeof products[0]) => `${p.origin.region}, ${p.origin.country}` },
    { label: 'Producer', render: (p: typeof products[0]) => p.origin.producer },
    { label: 'Organic', render: (p: typeof products[0]) => p.organic ? '✅ Yes' : '❌ No' },
    { label: 'Fat', render: (p: typeof products[0]) => p.nutrition.fat },
    { label: 'Sugar', render: (p: typeof products[0]) => p.nutrition.sugar },
    { label: 'Protein', render: (p: typeof products[0]) => p.nutrition.protein },
    { label: 'Eco Score', render: (p: typeof products[0]) => `${Math.round(Object.values(p.sustainability).reduce((a, b) => a + b, 0) / 5)}%` },
    { label: 'Recyclability', render: (p: typeof products[0]) => `${p.sustainability.recyclability}%` },
    { label: 'Expiry', render: (p: typeof products[0]) => new Date(p.expiry).toLocaleDateString() },
  ];

  return (
    <MobileLayout>
      <div className="px-4 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="mb-4 p-2 -ml-2 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-display text-xl font-extrabold text-foreground mb-1">Compare Products</h1>
        <p className="text-sm text-muted-foreground mb-4">Swipe to see all products</p>
      </div>

      <div className="overflow-x-auto hide-scrollbar px-4 pb-6">
        <table className="w-full" style={{ minWidth: `${products.length * 140 + 80}px` }}>
          <thead>
            <tr>
              <th className="sticky left-0 bg-background z-10 w-20" />
              {products.map(p => (
                <th key={p.id} className="px-2 pb-3 text-center min-w-[130px]">
                  <button onClick={() => navigate(`/product/${p.id}`)} className="w-full">
                    <div className="w-16 h-16 rounded-xl bg-muted mx-auto mb-2 overflow-hidden">
                      <img src={imageMap[p.image]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs font-display font-bold text-foreground leading-tight">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.brand}</p>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={cn(i % 2 === 0 && 'bg-muted/50')}>
                <td className="sticky left-0 bg-background z-10 py-2.5 pr-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{row.label}</span>
                </td>
                {products.map(p => (
                  <td key={p.id} className="px-2 py-2.5 text-center">
                    <span className="text-xs text-foreground font-medium">{row.render(p)}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MobileLayout>
  );
};

export default Compare;
