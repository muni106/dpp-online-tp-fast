import { MobileLayout } from '@/components/layout/MobileLayout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Edit Profile', desc: 'Name, email, avatar' },
    { icon: Bell, label: 'Notifications', desc: 'Expiry reminders, rewards' },
    { icon: Shield, label: 'Privacy & Data', desc: 'Manage your data' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ, contact us' },
  ];

  return (
    <MobileLayout>
      <div className="px-5 pt-12">
        <h1 className="font-display text-2xl font-extrabold text-foreground mb-6">Profile</h1>

        {/* User card */}
        <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-2xl">
            JD
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">Jane Doe</h2>
            <p className="text-xs text-muted-foreground">jane.doe@email.com</p>
            <p className="text-[10px] text-accent font-semibold mt-1">120 reward points</p>
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-2">
          {menuItems.map(item => (
            <button key={item.label} className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-display font-bold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/auth')}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-display font-bold hover:bg-destructive/5 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
