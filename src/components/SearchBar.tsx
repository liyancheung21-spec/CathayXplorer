import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({ 
  placeholder = "Search destinations...", 
  value,
  onChange,
  onFilterClick 
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="pl-10 pr-4 py-5 rounded-full bg-mist-gray border-0 focus-visible:ring-2 focus-visible:ring-offset-0"
          style={{ '--tw-ring-color': 'var(--cathay-jade)' } as any}
        />
      </div>
      <button
        onClick={onFilterClick}
        className="flex-shrink-0 w-11 h-11 rounded-full bg-mist-gray flex items-center justify-center hover:bg-secondary transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
