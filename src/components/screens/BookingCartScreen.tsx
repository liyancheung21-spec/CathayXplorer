import { ArrowLeft, CreditCard, Wallet, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface TripSuggestion {
  destination: string;
  country: string;
  duration: string;
  estimatedBudget: string;
  bestTimeToVisit: string;
  description: string;
  highlights: string[];
  flightOptions: FlightOption[];
  hotelOptions: HotelOption[];
  addOnOptions: AddOnOption[];
  itinerary: DayItinerary[];
  asiaMilesOptimization: {
    potentialEarnings: number;
    redemptionOptions: string[];
  };
}

interface FlightOption {
  airline: 'Cathay Pacific' | 'HK Express';
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  asiaMiles: number;
  class: string;
  stops?: number;
  via?: string;
  aircraft?: string;
}

interface HotelOption {
  name: string;
  rating: number;
  pricePerNight: number;
  asiaMilesRedemption?: number;
  location: string;
  amenities: string[];
}

interface AddOnOption {
  id: string;
  type: 'car' | 'insurance' | 'guide' | 'other';
  name: string;
  description: string;
  price: number;
  duration?: string;
  icon: 'car' | 'shield' | 'user' | 'shopping-bag';
  recommended?: boolean;
}

interface DayItinerary {
  day: number;
  title: string;
  activities: Activity[];
}

interface Activity {
  time: string;
  title: string;
  description: string;
  cost?: string;
  duration?: string;
}

interface BookingCartScreenProps {
  tripData?: TripSuggestion;
  selectedFlight?: number;
  selectedHotel?: number;
  selectedAddOns?: number[];
  onBack: () => void;
  onConfirm: () => void;
}

export function BookingCartScreen({ 
  tripData,
  selectedFlight = 0,
  selectedHotel = 0,
  selectedAddOns = [],
  onBack, 
  onConfirm 
}: BookingCartScreenProps) {
  const [useAsiaMiles, setUseAsiaMiles] = useState(false);
  const [addInsurance, setAddInsurance] = useState(true);

  // Extract number of nights from duration string
  const numberOfNights = tripData 
    ? parseInt(tripData.duration.match(/\d+/)?.[0] || '1')
    : 3;

  // Build booking items dynamically from trip data
  const bookingItems = tripData ? (() => {
    const items = [];
    
    // Flight
    const flight = tripData.flightOptions[selectedFlight];
    const stopsText = flight.stops === 0 ? 'Nonstop' : `1 Stop${flight.via ? ` via ${flight.via}` : ''}`;
    items.push({
      category: 'Flight',
      brand: flight.airline,
      title: `${flight.flightNumber} • ${stopsText}`,
      details: `${flight.class} • 1 Adult`,
      flightMeta: {
        aircraft: flight.aircraft,
        class: flight.class
      },
      price: flight.price,
      miles: flight.asiaMiles
    });
    
    // Hotel
    const hotel = tripData.hotelOptions[selectedHotel];
    items.push({
      category: 'Hotel',
      brand: 'Cathay Holidays',
      title: hotel.name,
      details: `${numberOfNights} night${numberOfNights > 1 ? 's' : ''} • ${hotel.location}`,
      price: hotel.pricePerNight * numberOfNights,
      miles: (hotel.asiaMilesRedemption || 0) * numberOfNights
    });
    
    // Add-ons
    selectedAddOns.forEach(index => {
      const addon = tripData.addOnOptions[index];
      if (addon) {
        const brandMap: Record<string, string> = {
          'car': 'Cathay Pacific Car Rental',
          'insurance': 'Chubb Travel Insurance',
          'guide': 'Cathay Holidays',
          'other': 'Cathay Services'
        };
        
        items.push({
          category: addon.type === 'car' ? 'Car Rental' : addon.type === 'insurance' ? 'Insurance' : addon.type === 'guide' ? 'Tour Guide' : 'Service',
          brand: brandMap[addon.type],
          title: addon.name,
          details: addon.description,
          price: addon.price,
          miles: Math.round(addon.price * 12.5) // Rough Asia Miles estimate
        });
      }
    });
    
    return items;
  })() : [
    {
      category: 'Flight',
      brand: 'Cathay Pacific',
      title: 'CX500 06:00 HKG → 11:15 NRT',
      details: 'Economy • Nonstop • 1 Adult',
      price: 4450,
      miles: 2220
    },
    {
      category: 'Hotel',
      brand: 'Cathay Holidays',
      title: 'Park Hyatt Tokyo',
      details: '3 nights • Shinjuku',
      price: 4800,
      miles: 60000
    }
  ];

  const subtotal = bookingItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 500;
  const total = subtotal - discount;
  const totalMiles = bookingItems.reduce((sum, item) => sum + item.miles, 0);

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onBack} className="w-9 h-9 rounded-full bg-mist-gray flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2>Checkout</h2>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-8 max-w-md mx-auto space-y-4">
        {/* Miles Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#006564]/10 flex items-center justify-center">
                <Wallet className="w-5 h-5" style={{ color: 'var(--cathay-jade)' }} />
              </div>
              <div>
                <p>Pay with Asia Miles</p>
                <p className="text-muted-foreground text-sm truncate">
                  {useAsiaMiles ? `${totalMiles.toLocaleString()} mi` : 'Save cash, use miles'}
                </p>
              </div>
            </div>
            <Switch checked={useAsiaMiles} onCheckedChange={setUseAsiaMiles} />
          </div>
        </Card>

        {/* Booking Items */}
        <div className="space-y-3">
          <h3>Your Booking</h3>
          {bookingItems.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{item.category}</Badge>
                    <p className="text-muted-foreground text-xs truncate">via {item.brand}</p>
                  </div>
                  <p>{item.title}</p>
                  {item.flightMeta ? (
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      {item.flightMeta.aircraft && <p>{item.flightMeta.aircraft}</p>}
                      <p>{item.flightMeta.class}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{item.details}</p>
                  )}
                </div>
                <div className="text-right">
                  <p>
                    {useAsiaMiles ? `${item.miles.toLocaleString()} mi` : `HKD ${item.price.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Insurance Toggle */}
        <Card className="p-4 border-[#006564]/30 bg-[#006564]/5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 mt-0.5" style={{ color: 'var(--cathay-jade)' }} />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p>Travel Protection Plus</p>
                  <p className="text-muted-foreground text-sm">Recommended for intl. trips</p>
                </div>
                <Switch checked={addInsurance} onCheckedChange={setAddInsurance} />
              </div>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>✓ Medical up to HKD 1M</li>
                <li>✓ Trip cancellation</li>
                <li>✓ Lost baggage</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Price Breakdown */}
        <Card className="p-4 space-y-3">
          <h3>Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Subtotal</p>
              <p>{useAsiaMiles ? `${totalMiles.toLocaleString()} miles` : `HKD ${subtotal.toLocaleString()}`}</p>
            </div>
            <div className="flex justify-between text-[#006564]">
              <p>Cathay Member Discount</p>
              <p>-{useAsiaMiles ? '6,000 miles' : 'HKD 500'}</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p>Total</p>
              <p>{useAsiaMiles ? `${(totalMiles - 6000).toLocaleString()} miles` : `HKD ${total.toLocaleString()}`}</p>
            </div>
          </div>
        </Card>

        {/* Miles Earning */}
        {!useAsiaMiles && (
          <Card className="p-4 bg-gradient-to-r from-[#C1B49A]/10 to-[#C1B49A]/5 border-[#C1B49A]/30">
            <p>You'll earn</p>
            <p className="text-[#C1B49A]">+5,248 Asia Miles</p>
          </Card>
        )}

        {/* Payment Method */}
        <Card className="p-4">
          <p className="mb-3">Payment Method</p>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-mist-gray">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p>Cathay x Standard Chartered Mastercard</p>
              <p className="text-muted-foreground">•••• 4242 • Exp 12/26</p>
            </div>
            <Button variant="ghost" size="sm">Change</Button>
          </div>
        </Card>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Total</p>
            <p>{useAsiaMiles ? `${(totalMiles - 6000).toLocaleString()} miles` : `HKD ${total.toLocaleString()}`}</p>
          </div>
          <Button 
            onClick={onConfirm}
            size="lg" 
            className="w-full"
            style={{ backgroundColor: 'var(--cathay-jade)' }}
          >
            Confirm & Pay
          </Button>
          <p className="text-center text-muted-foreground text-xs">
            Cancel anytime before Mar 20, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
