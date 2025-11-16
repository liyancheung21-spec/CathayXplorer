import { Sparkles, Wallet } from "lucide-react";
import cathayCardBg from 'figma:asset/acf841f9e9998279386fc1c397597315f4b64187.png';

interface UserStatusBarProps {
  userTier?: string;
  asiaMiles?: number;
  onMilesClick?: () => void;
  userName?: string;
}

export function UserStatusBar({ 
  userTier = 'Gold', 
  asiaMiles = 124580,
  onMilesClick,
  userName = 'John Doe'
}: UserStatusBarProps) {
  return (
    <div className="bg-white px-5 pt-3 pb-2 border-b border-border">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm">{userName}</h2>
            <img src={cathayCardBg} alt="Cathay" className="h-[1em] w-auto rounded" />
          </div>
          <div 
            className="px-3 py-1 rounded-full text-white flex items-center gap-1.5"
            style={{ backgroundColor: 'var(--cathay-gold)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-sm">{userTier}</span>
          </div>
        </div>
        <button 
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          onClick={onMilesClick}
        >
          <Wallet className="w-4 h-4" style={{ color: 'var(--cathay-jade)' }} />
          <span className="font-medium text-sm">{asiaMiles.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">mi</span>
        </button>
      </div>
    </div>
  );
}
