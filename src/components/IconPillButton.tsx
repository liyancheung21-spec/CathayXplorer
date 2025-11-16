import { LucideIcon } from 'lucide-react';

interface IconPillButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function IconPillButton({ icon: Icon, label, onClick }: IconPillButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-[18px] bg-[#EBEDEC] hover:bg-[#C6C2C1] transition-colors"
      style={{ height: '36px' }}
    >
      <Icon className="w-4 h-4 text-foreground" strokeWidth={2} />
      <span className="text-sm">{label}</span>
    </button>
  );
}
