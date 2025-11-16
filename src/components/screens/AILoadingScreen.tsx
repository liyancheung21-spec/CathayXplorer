import { useEffect, useState } from 'react';
import { Sparkles, Plane, MapPin, Hotel, Calendar } from 'lucide-react';
import veraLogo from 'figma:asset/01ed25c37cb885576659844eee5e3c2ac355eb97.png';

interface AILoadingScreenProps {
  prompt: string;
}

export function AILoadingScreen({ prompt }: AILoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: Sparkles, text: 'Understanding your travel preferences...' },
    { icon: MapPin, text: 'Discovering perfect destinations...' },
    { icon: Plane, text: 'Finding the best flight options...' },
    { icon: Hotel, text: 'Selecting ideal accommodations...' },
    { icon: Calendar, text: 'Crafting your personalized itinerary...' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: 'linear-gradient(135deg, #006564 0%, #367D79 100%)' }}
    >
      <div className="max-w-md w-full text-center">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          <div className="w-40 h-40 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <img src={veraLogo} alt="Vera AI" className="w-32 h-32" />
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-white/70 rounded-full -translate-x-1/2" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
            <div className="absolute top-1/2 right-0 w-3 h-3 bg-white/50 rounded-full -translate-y-1/2" />
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-white mb-3">Planning Your Perfect Trip</h2>
        <p className="text-white/80 mb-8">"{prompt}"</p>

        {/* Progress Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isDone = index < currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20 backdrop-blur-sm scale-105' 
                    : isDone 
                    ? 'bg-white/10' 
                    : 'bg-white/5'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${isActive ? 'bg-white/30' : isDone ? 'bg-white/20' : 'bg-white/10'}
                `}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/60'}`} />
                </div>
                <p className={`text-sm ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Loading Bar */}
        <div className="mt-8 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full transition-all duration-300"
            style={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              transition: 'width 0.6s ease-in-out'
            }}
          />
        </div>

        <p className="text-white/60 text-sm mt-4">
          This may take a few moments...
        </p>
      </div>
    </div>
  );
}
