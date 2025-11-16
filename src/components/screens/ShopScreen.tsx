import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, ShoppingBag, Star, Tag } from "lucide-react";

interface ShopScreenProps {
  onBack: () => void;
}

export function ShopScreen({ onBack }: ShopScreenProps) {
  const products = [
    {
      id: 1,
      name: 'Premium Wine Collection',
      description: 'Bordeaux Grand Cru 2015',
      price: 'HKD 1,280',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Wine & Spirits',
      rating: 4.9,
      stock: 'Limited Stock'
    },
    {
      id: 2,
      name: 'Rimowa Classic Cabin S',
      description: 'Aluminum 4-Wheel Luggage',
      price: 'HKD 6,800',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdWdnYWdlJTIwc3VpdGNhc2V8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Luggage',
      rating: 4.8,
      stock: 'In Stock'
    },
    {
      id: 3,
      name: 'Cathay Travel Amenity Kit',
      description: 'Premium First Class Kit',
      price: 'HKD 380',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBraXR8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Travel Essentials',
      rating: 4.7,
      stock: 'In Stock'
    },
    {
      id: 4,
      name: 'Bose QuietComfort 45',
      description: 'Wireless Noise Cancelling Headphones',
      price: 'HKD 2,480',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Electronics',
      rating: 4.9,
      stock: 'In Stock'
    },
    {
      id: 5,
      name: 'Travel Pillow Set',
      description: 'Memory Foam with Eye Mask',
      price: 'HKD 280',
      image: 'https://images.unsplash.com/photo-1587388993270-e0cbeb5637dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwaWxsb3d8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Travel Essentials',
      rating: 4.6,
      stock: 'In Stock'
    },
    {
      id: 6,
      name: 'Champagne Dom Pérignon',
      description: 'Vintage 2013',
      price: 'HKD 1,980',
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmV8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Wine & Spirits',
      rating: 5.0,
      stock: 'Limited Stock'
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
              <ShoppingBag className="w-6 h-6" />
              <h1 className="text-white">Cathay Shop</h1>
            </div>
          </div>
          <p className="text-white/90 ml-12">
            Premium travel essentials & lifestyle products
          </p>
        </div>
      </div>

      {/* Exclusive Banner */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <Card className="p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#C1B49A]/10 border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <Tag className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Member Exclusive</h3>
              <p className="text-sm text-muted-foreground">
                Earn 2x Asia Miles on all Cathay Shop purchases
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="default" className="bg-[#006564] text-white whitespace-nowrap">All Products</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Luggage</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Wine & Spirits</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Electronics</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Travel Essentials</Badge>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2>Featured Products</h2>
          <Badge variant="secondary" className="bg-[#006564]/10 text-[#006564]">
            Bestsellers
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-40 relative">
                <ImageWithFallback 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stock === 'Limited Stock' && (
                  <Badge className="absolute top-2 right-2 bg-red-600 text-white border-0 text-xs">
                    Limited
                  </Badge>
                )}
              </div>
              <div className="p-3">
                <Badge variant="secondary" className="mb-2 text-xs">
                  {product.category}
                </Badge>
                <h4 className="mb-1 text-sm line-clamp-2">{product.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                  <p className="text-xs text-muted-foreground">{product.rating}</p>
                </div>
                <p className="text-[#006564] mb-3">{product.price}</p>
                <Button size="sm" className="w-full bg-[#006564] hover:bg-[#367D79] text-white text-xs h-8">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
