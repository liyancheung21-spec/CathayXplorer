import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [allowAITraining, setAllowAITraining] = useState(false);

  return (
    <div className="min-h-screen bg-mist-gray">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-mist-gray flex items-center justify-center hover:bg-slate/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2>Settings</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-6 max-w-md mx-auto">
        {/* AI Data Training Section */}
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <h3 className="mb-2">AI & Privacy</h3>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="ai-training" className="text-base">
                  Allow data for AI training
                </Label>
                <p className="text-muted-foreground text-sm mt-1">
                  Help improve Vera AI by allowing your anonymized travel preferences and interactions to train our AI models. Your personal information will never be shared.
                </p>
              </div>
              <Switch
                id="ai-training"
                checked={allowAITraining}
                onCheckedChange={setAllowAITraining}
                className="flex-shrink-0"
              />
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {allowAITraining ? (
                <span className="text-[#006564]">
                  ✓ Thank you for helping improve Cathay Xplorer's AI capabilities
                </span>
              ) : (
                <span>
                  Your data will not be used for AI training
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Additional Settings Sections (placeholders) */}
        <div className="mt-4 bg-white rounded-lg p-5 shadow-sm">
          <h3 className="mb-3">Account</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Profile Settings
            </button>
            <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Notification Preferences
            </button>
            <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Payment Methods
            </button>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-lg p-5 shadow-sm">
          <h3 className="mb-3">Support</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Help Center
            </button>
            <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </button>
            <button className="w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
              Terms & Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
