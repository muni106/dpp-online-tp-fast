import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { PackyButton } from '../PackyButton';

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showPacky?: boolean;
}

export const MobileLayout = ({ children, showNav = true, showPacky = true }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen max-w-md md:max-w-2xl lg:max-w-5xl mx-auto bg-background relative transition-all">
      <div className={showNav ? 'pb-20' : ''}>
        {children}
      </div>
      {showPacky && <PackyButton />}
      {showNav && <BottomNav />}
    </div>
  );
};
