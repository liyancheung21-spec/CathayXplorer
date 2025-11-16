import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Gift, Plane, Hotel, Calendar, Percent } from "lucide-react";

interface PackagesScreenProps {
  onBack: () => void;
}

export function PackagesScreen({ onBack }: PackagesScreenProps) {
  const packages = [
    {
      id: 1,
      name: 'Tokyo Winter Escape',
      destination: 'Tokyo, Japan',
      duration: '5 Days 4 Nights',
      price: 'HKD 8,900',
      originalPrice: 'HKD 10,500',
      discount: '15% OFF',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHdpbnRlcnxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Round-trip flight', '4-star hotel', 'Airport transfer']
    },
    {
      id: 2,
      name: 'Bali Beach Paradise',
      destination: 'Bali, Indonesia',
      duration: '7 Days 6 Nights',
      price: 'HKD 7,200',
      originalPrice: 'HKD 9,000',
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYmVhY2h8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Round-trip flight', 'Resort stay', 'Daily breakfast', 'Spa voucher']
    },
    {
      id: 3,
      name: 'Singapore City Break',
      destination: 'Singapore',
      duration: '4 Days 3 Nights',
      price: 'HKD 5,500',
      originalPrice: 'HKD 6,800',
      discount: '19% OFF',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBjaXR5fGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Round-trip flight', 'Luxury hotel', 'City tour', 'Gardens by the Bay']
    },
    {
      id: 4,
      name: 'Bangkok Cultural Tour',
      destination: 'Bangkok, Thailand',
      duration: '5 Days 4 Nights',
      price: 'HKD 4,800',
      originalPrice: 'HKD 6,200',
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      includes: ['Round-trip flight', 'Boutique hotel', 'Temple tours', 'Thai cooking class']
    }
  ];

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-4 pt-4 pb-6 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6" />
              <h1 className="text-white">Packages</h1>
            </div>
          </div>
          <p className="text-white/90 ml-12">
            Save more with bundled flight + hotel packages
          </p>
        </div>
      </div>

      {/* Exclusive Deals Banner */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <Card className="p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#C1B49A]/10 border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <Percent className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Exclusive Package Deals</h3>
              <p className="text-sm text-muted-foreground">
                Save up to 25% when you book flight + hotel together
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Package Listings */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2>Featured Packages</h2>
          <Badge variant="secondary" className="bg-[#006564]/10 text-[#006564]">
            Best Value
          </Badge>
        </div>

        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <ImageWithFallback 
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-red-600 text-white border-0">
                  {pkg.discount}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="mb-1">{pkg.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">{pkg.duration} • {pkg.destination}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm">Package includes:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.includes.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {index < 2 ? (
                          index === 0 ? (
                            <Plane className="w-3 h-3 text-[#006564]" />
                          ) : (
                            <Hotel className="w-3 h-3 text-[#006564]" />
                          )
                        ) : null}
                        <p className="text-xs text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground line-through">{pkg.originalPrice}</p>
                    <p className="text-[#006564]">{pkg.price}</p>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                  <Button size="sm" className="bg-[#006564] hover:bg-[#367D79] text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
