import { Calendar, Plane, Compass, Sparkles, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: 'discover' | 'plan' | 'trip' | 'inspire' | 'profile';
  onTabChange: (tab: 'discover' | 'plan' | 'trip' | 'inspire' | 'profile') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'plan' as const, icon: Calendar, label: 'Plan' },
    { id: 'inspire' as const, icon: Sparkles, label: 'Inspire' },
    { id: 'discover' as const, icon: Compass, label: 'Discover', isCenter: true },
    { id: 'trip' as const, icon: Plane, label: 'Trip' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="max-w-md mx-auto px-1 py-1.5">
        <div className="flex items-center justify-between px-2">
          {tabs.map(({ id, icon: Icon, label, isCenter }) => {
            const isActive = activeTab === id;
            
            // Center tab (Discover) with special styling
            if (isCenter) {
              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all duration-300"
                  style={{ marginTop: '-20px' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? 'var(--cathay-jade)' : 'var(--medium-jade)',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isActive 
                        ? '0 8px 16px rgba(0, 104, 94, 0.3)' 
                        : '0 4px 12px rgba(0, 104, 94, 0.2)',
                    }}
                  >
                    <Icon 
                      className="w-7 h-7 text-white transition-all duration-300" 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                  </div>
                  <span 
                    className="text-[10px] mt-1 transition-all duration-300"
                    style={{ 
                      color: isActive ? 'var(--cathay-jade)' : 'var(--muted-foreground)',
                      fontWeight: isActive ? 600 : 400
                    }}
                  >
                    {label}
                  </span>
                </button>
              );
            }
            
            // Regular tabs
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-300 relative"
                style={{
                  color: isActive ? 'var(--cathay-jade)' : 'var(--muted-foreground)',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <Icon 
                  className="w-6 h-6 transition-all duration-300" 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                <span 
                  className="text-[10px] transition-all duration-300"
                  style={{ fontWeight: isActive ? 600 : 400 }}
                >
                  {label}
                </span>
                {isActive && (
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--cathay-jade)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
