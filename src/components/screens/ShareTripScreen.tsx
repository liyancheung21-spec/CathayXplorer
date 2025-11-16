import { useState } from 'react';
import { ArrowLeft, Camera, X, MapPin, Clock, Sparkles, Upload, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RecentTrip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  duration: string;
  thumbnail?: string;
}

// Mock recent trips from user's trip history
const recentTrips: RecentTrip[] = [
  {
    id: 'rt1',
    destination: 'Tokyo',
    country: 'Japan',
    startDate: 'Nov 1, 2024',
    endDate: 'Nov 5, 2024',
    duration: '5 days',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHl8ZW58MXx8fHwxNzYzMjA4ODY2fDA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 'rt2',
    destination: 'Paris',
    country: 'France',
    startDate: 'Oct 10, 2024',
    endDate: 'Oct 15, 2024',
    duration: '6 days',
    thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MzIwODg2Nnww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 'rt3',
    destination: 'Dubai',
    country: 'UAE',
    startDate: 'Sep 20, 2024',
    endDate: 'Sep 25, 2024',
    duration: '6 days',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGNpdHl8ZW58MXx8fHwxNzYzMjA4ODY2fDA&ixlib=rb-4.1.0&q=80&w=400'
  }
];

const categories = [
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'luxury', label: 'Luxury', icon: '✨' },
  { id: 'hidden-gem', label: 'Hidden Gems', icon: '💎' }
];

interface ShareTripScreenProps {
  onBack?: () => void;
}

export function ShareTripScreen({ onBack }: ShareTripScreenProps) {
  const [step, setStep] = useState<'select-trip' | 'create-post' | 'success'>('select-trip');
  const [selectedTrip, setSelectedTrip] = useState<RecentTrip | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleSelectTrip = (trip: RecentTrip) => {
    setSelectedTrip(trip);
    setStep('create-post');
  };

  const handleAddTag = () => {
    if (currentTag.trim() && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = () => {
    // Simulate image upload - in real app this would open file picker
    const mockImages = [
      'https://images.unsplash.com/photo-1761986758241-77549539536a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBqb3VybmV5JTIwc2hhcmV8ZW58MXx8fHwxNzYzMjA4ODY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760898131550-e2fd810bfdec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cGxvYWQlMjBwaG90b3MlMjBtZW1vcmllc3xlbnwxfHx8fDE3NjMyMDg4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ];
    if (uploadedImages.length < 5) {
      setUploadedImages([...uploadedImages, mockImages[uploadedImages.length % mockImages.length]]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (title && description && selectedCategory && uploadedImages.length > 0) {
      setStep('success');
      setTimeout(() => {
        onBack?.();
      }, 2000);
    }
  };

  const isFormValid = title && description && selectedCategory && uploadedImages.length > 0;

  // Success Screen
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#006564] to-[#367D79] flex items-center justify-center px-5">
        <div className="text-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-white mb-3">Journey Shared!</h1>
          <p className="text-white/90 mb-2">Your travel experience has been published</p>
          <p className="text-white/70 text-sm">Inspiring the Cathay community...</p>
        </div>
      </div>
    );
  }

  // Select Trip Screen
  if (step === 'select-trip') {
    return (
      <div className="min-h-screen bg-mist-gray">
        {/* Top spacing for fixed status bar */}
        <div className="h-[52px]" />
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-5 pt-6 pb-8 text-white">
          <div className="max-w-md mx-auto">
            <button
              onClick={onBack}
              className="mb-6 p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white mb-2">Share Your Journey</h1>
            <p className="text-white/80">Select a recent trip to share with the community</p>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="px-5 pt-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--cathay-jade)' }} />
            <h2>Your Recent Trips</h2>
          </div>

          <div className="space-y-3">
            {recentTrips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelectTrip(trip)}
              >
                <div className="flex gap-4 p-4">
                  {trip.thumbnail && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={trip.thumbnail}
                        alt={trip.destination}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">{trip.destination}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{trip.duration}</span>
                      </div>
                      <span>•</span>
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Manual Entry Option */}
          <button
            onClick={() => {
              setSelectedTrip({
                id: 'manual',
                destination: '',
                country: '',
                startDate: '',
                endDate: '',
                duration: ''
              });
              setStep('create-post');
            }}
            className="w-full mt-4 p-4 rounded-lg border-2 border-dashed border-border hover:border-[#006564] hover:bg-[#006564]/5 transition-colors"
          >
            <div className="flex items-center justify-center gap-2" style={{ color: 'var(--cathay-jade)' }}>
              <Sparkles className="w-5 h-5" />
              <span>Share a custom journey</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Create Post Screen
  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-5 pt-6 pb-8 text-white sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setStep('select-trip')}
              className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Go back to trip selection"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Button
              onClick={handlePublish}
              disabled={!isFormValid}
              className="bg-white text-[#006564] hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish
            </Button>
          </div>
          <h1 className="text-white mb-2">Create Your Post</h1>
          <p className="text-white/80">Share your experience with the community</p>
        </div>
      </div>

      <div className="px-5 pt-6 max-w-md mx-auto space-y-6">
        {/* Trip Info */}
        {selectedTrip?.destination && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" style={{ color: 'var(--cathay-jade)' }} />
              <h3>{selectedTrip.destination}, {selectedTrip.country}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{selectedTrip.duration}</span>
            </div>
          </Card>
        )}

        {/* Upload Photos */}
        <div>
          <label className="block mb-3">
            <span className="flex items-center gap-2">
              <Camera className="w-5 h-5" style={{ color: 'var(--cathay-jade)' }} />
              Photos (up to 5)
            </span>
          </label>
          
          <div className="grid grid-cols-3 gap-3">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            
            {uploadedImages.length < 5 && (
              <button
                onClick={handleImageUpload}
                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-[#006564] hover:bg-[#006564]/5 transition-colors flex flex-col items-center justify-center gap-1"
                aria-label="Upload photo"
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload</span>
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-2">
            Title *
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your journey a catchy title..."
            maxLength={100}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">{title.length}/100 characters</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2">
            Description *
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share the highlights of your journey, special moments, recommendations..."
            maxLength={500}
            rows={5}
            className="w-full resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">{description.length}/500 characters</p>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-3">
            Category *
          </label>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                  style={{
                    backgroundColor: isActive ? 'var(--cathay-jade)' : 'var(--mist-gray)',
                    color: isActive ? 'white' : 'var(--charcoal)'
                  }}
                  aria-pressed={isActive}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tag-input" className="block mb-2">
            Tags (up to 5)
          </label>
          <div className="flex gap-2 mb-3">
            <Input
              id="tag-input"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add a tag..."
              maxLength={20}
              disabled={tags.length >= 5}
              className="flex-1"
            />
            <Button
              onClick={handleAddTag}
              disabled={!currentTag.trim() || tags.length >= 5}
              variant="outline"
              style={{ borderColor: 'var(--cathay-jade)', color: 'var(--cathay-jade)' }}
            >
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 hover:text-destructive"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
