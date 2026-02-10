import { Home, ScanLine, Gift, Users, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: ScanLine, label: 'Scan', path: '/' },
  { icon: Gift, label: 'Rewards', path: '/rewards' },
  { icon: Users, label: 'Community', path: '/community' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isScan = item.label === 'Scan';
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all',
                isScan && 'relative -mt-5',
                isActive && !isScan && 'text-primary',
                !isActive && !isScan && 'text-muted-foreground',
              )}
            >
              {isScan ? (
                <div className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shadow-lg',
                  'bg-accent text-accent-foreground'
                )}>
                  <item.icon className="w-6 h-6" />
                </div>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span className={cn(
                'text-[10px] font-medium font-display',
                isScan && 'mt-1'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
