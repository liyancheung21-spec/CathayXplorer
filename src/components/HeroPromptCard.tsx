import { useState } from "react";
import { Sparkles, Mic, Send } from "lucide-react";

interface HeroPromptCardProps {
  variant?: 'default' | 'focused' | 'compact' | 'collapsed';
  userName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: (prompt: string) => void;
  isScrollingUp?: boolean;
}

export function HeroPromptCard({ 
  variant = 'default',
  userName = 'John',
  onFocus,
  onBlur,
  onSubmit,
  isScrollingUp = false
}: HeroPromptCardProps) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const suggestions = [
    'Weekend escape',
    'Three days Tokyo',
    'Someplace warm',
    'Surprise me'
  ];

  const handleFocus = () => {
    setIsFocused(true);
    // Delay showing suggestions until after expansion animation completes
    setTimeout(() => {
      setShowSuggestions(true);
    }, 300); // Match the transition duration
    onFocus?.();
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Don't blur if clicking on a suggestion chip
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('.suggestion-chip')) {
      return;
    }
    setIsFocused(false);
    setShowSuggestions(false);
    onBlur?.();
  };

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit?.(prompt);
      setPrompt('');
      setSelectedSuggestion(null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setPrompt(suggestion);
  };

  // Collapsed state for scrolling - can expand to show suggestions
  if (variant === 'collapsed') {
    const collapsedHeight = isFocused ? '184px' : '96px';
    
    return (
      <div 
        className={`w-full rounded-[16px] shadow-md transition-all duration-300 ${
          isScrollingUp ? 'animate-bounce-in' : ''
        }`}
        style={{ 
          background: 'linear-gradient(to right, #006564 0%, #367D79 100%)',
          height: collapsedHeight,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.10)'
        }}
      >
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-white text-[16px]">
            {getGreeting()}, {userName}
          </h3>
          <div 
            className="rounded-full flex items-center px-3 py-2 gap-2"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              height: '36px'
            }}
          >
            <Sparkles className="w-4 h-4 text-white flex-shrink-0" />
            <input
              type="text"
              placeholder="Ask Vera to plan your trip…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder:text-white/70"
            />
            <button 
              className="flex-shrink-0 hover:scale-110 transition-transform"
              onClick={() => {/* Voice input */}}
            >
              <Mic className="w-4 h-4 text-white" />
            </button>
            <button 
              className="flex-shrink-0 hover:scale-110 transition-transform"
              onClick={handleSubmit}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Suggestion Chips - Show when focused and after animation */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => {
                const isSelected = selectedSuggestion === suggestion;
                return (
                  <button
                    key={suggestion}
                    type="button"
                    className={`suggestion-chip px-2.5 py-1 rounded-full border border-white text-xs transition-all ${
                      isSelected 
                        ? 'bg-white' 
                        : 'bg-transparent hover:bg-white/10'
                    }`}
                    style={{ 
                      height: '28px',
                      color: isSelected ? 'var(--cathay-jade)' : 'white'
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(suggestion);
                    }}
                  >
                    {suggestion}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const cardHeight = variant === 'focused' || isFocused ? '320px' : '240px';

  return (
    <div 
      className="w-full rounded-[20px] shadow-lg transition-all duration-300 ease-out"
      style={{ 
        background: 'linear-gradient(to right, #006564 0%, #367D79 100%)',
        height: cardHeight,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.10)'
      }}
    >
      <div className="p-5 space-y-3 flex flex-col items-center">
        {/* Profile Avatar - Centered at Top - ENLARGED */}
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
          <Sparkles className="w-12 h-12" style={{ color: 'var(--cathay-jade)' }} />
        </div>

        {/* Greeting */}
        <h2 className="text-white text-[24px] text-center">
          {getGreeting()}, {userName}
        </h2>

        {/* Prompt Field */}
        <div 
          className="w-full rounded-full flex items-center px-4 py-3 gap-3 transition-all"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)',
            height: '44px'
          }}
        >
          <Sparkles className="w-5 h-5 text-white flex-shrink-0" />
          <input
            type="text"
            placeholder="Ask Vera to plan your trip…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-white/60"
          />
          <button 
            className="flex-shrink-0 hover:scale-110 transition-transform"
            onClick={() => {/* Voice input */}}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
          <button 
            className="flex-shrink-0 hover:scale-110 transition-transform"
            onClick={handleSubmit}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Suggestion Chips - Only show when focused or variant is focused */}
        {(variant === 'focused' || isFocused) && (
          <div className="w-full flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion) => {
              const isSelected = selectedSuggestion === suggestion;
              return (
                <button
                  key={suggestion}
                  type="button"
                  className={`suggestion-chip px-3 py-1.5 rounded-full border border-white text-sm transition-all ${
                    isSelected 
                      ? 'bg-white' 
                      : 'bg-transparent hover:bg-white/10'
                  }`}
                  style={{ 
                    height: '32px',
                    color: isSelected ? 'var(--cathay-jade)' : 'white'
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent blur from firing
                    handleSuggestionClick(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}