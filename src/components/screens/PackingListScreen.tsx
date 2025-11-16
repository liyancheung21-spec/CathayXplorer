import { useState } from "react";
import { ArrowLeft, Plus, Trash2, ShoppingBag, ExternalLink, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface PackingListScreenProps {
  onBack: () => void;
  tripDestination?: string;
}

interface PackingItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  miles?: string;
}

const INITIAL_PACKING_ITEMS: PackingItem[] = [
  // Documents
  { id: "1", name: "Passport", checked: false, category: "Documents" },
  { id: "2", name: "Flight tickets / Boarding passes", checked: false, category: "Documents" },
  { id: "3", name: "Travel insurance documents", checked: false, category: "Documents" },
  { id: "4", name: "Hotel confirmations", checked: false, category: "Documents" },
  { id: "5", name: "Driver's license", checked: false, category: "Documents" },
  
  // Clothing
  { id: "6", name: "Underwear & socks", checked: false, category: "Clothing" },
  { id: "7", name: "Shirts / tops", checked: false, category: "Clothing" },
  { id: "8", name: "Pants / shorts", checked: false, category: "Clothing" },
  { id: "9", name: "Jacket or sweater", checked: false, category: "Clothing" },
  { id: "10", name: "Sleepwear", checked: false, category: "Clothing" },
  { id: "11", name: "Comfortable walking shoes", checked: false, category: "Clothing" },
  
  // Toiletries
  { id: "12", name: "Toothbrush & toothpaste", checked: false, category: "Toiletries" },
  { id: "13", name: "Shampoo & conditioner", checked: false, category: "Toiletries" },
  { id: "14", name: "Skincare products", checked: false, category: "Toiletries" },
  { id: "15", name: "Sunscreen", checked: false, category: "Toiletries" },
  { id: "16", name: "Medications", checked: false, category: "Toiletries" },
  
  // Electronics
  { id: "17", name: "Phone & charger", checked: false, category: "Electronics" },
  { id: "18", name: "Laptop & charger", checked: false, category: "Electronics" },
  { id: "19", name: "Headphones", checked: false, category: "Electronics" },
  { id: "20", name: "Power bank", checked: false, category: "Electronics" },
  { id: "21", name: "Camera", checked: false, category: "Electronics" },
  
  // Miscellaneous
  { id: "22", name: "Travel pillow", checked: false, category: "Miscellaneous" },
  { id: "23", name: "Eye mask & ear plugs", checked: false, category: "Miscellaneous" },
  { id: "24", name: "Reusable water bottle", checked: false, category: "Miscellaneous" },
  { id: "25", name: "Snacks", checked: false, category: "Miscellaneous" },
];

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "shop1",
    name: "Cathay x Samsonite Suitcase",
    description: "Second Edition - Durable and stylish luggage for your travels",
    image: "https://images.unsplash.com/photo-1636573785224-d9bbe74e1fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zb25pdGUlMjBsdWdnYWdlJTIwc3VpdGNhc2V8ZW58MXx8fHwxNzYxNDg4MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "https://lifestyle.asiamiles.com/en/HK/p/CXB_0476_60001/cathay-x-samsonite-suitcase-second-edition",
    miles: "28,800"
  },
  {
    id: "shop2",
    name: "GaN 65W PD High Performance Adaptor",
    description: "5 USB ports for all your charging needs",
    image: "https://images.unsplash.com/photo-1603899122911-27c0cb85824a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2IlMjBjaGFyZ2luZyUyMGFkYXB0b3J8ZW58MXx8fHwxNzYxNDg4MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "https://lifestyle.asiamiles.com/en/HK/p/TVM_0020_60001/travelmall-gan-65w-pd-high-performance-5-usb-adaptor",
    miles: "2,880"
  },
  {
    id: "shop3",
    name: "Moln Travel Organizer S",
    description: "Light Gray - Keep your essentials organized",
    image: "https://images.unsplash.com/photo-1758398332771-0a79c5df74a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBvcmdhbml6ZXIlMjBiYWd8ZW58MXx8fHwxNzYxNDg4MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "https://lifestyle.asiamiles.com/en/HK/p/IFC_1261_70001/moln-travel-organizer-s-light-gray",
    miles: "1,920"
  }
];

export function PackingListScreen({ onBack, tripDestination = "Tokyo" }: PackingListScreenProps) {
  const [items, setItems] = useState<PackingItem[]>(INITIAL_PACKING_ITEMS);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Miscellaneous");

  const categories = Array.from(new Set(items.map(item => item.category)));
  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: PackingItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        checked: false,
        category: selectedCategory
      };
      setItems([...items, newItem]);
      setNewItemName("");
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const openShopLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-warm-gray">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-mist-gray rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1>Packing List</h1>
            <p className="text-sm text-gray-600">Trip to {tripDestination}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm">{completedCount} of {totalCount} items packed</p>
            <span className="text-sm" style={{ color: 'var(--cathay-jade)' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: 'var(--cathay-jade)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* Travel Essentials from Cathay Shop */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2>Travel Essentials</h2>
            <Badge 
              variant="outline" 
              className="gap-1"
              style={{ borderColor: 'var(--cathay-jade)', color: 'var(--cathay-jade)' }}
            >
              <ShoppingBag className="w-3 h-3" />
              Cathay Shop
            </Badge>
          </div>
          
          <div className="space-y-3">
            {SHOP_ITEMS.map((product) => (
              <Card 
                key={product.id} 
                className="p-3 bg-white cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openShopLink(product.url)}
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {product.miles && (
                        <span className="text-xs" style={{ color: 'var(--cathay-jade)' }}>
                          {product.miles} Asia Miles
                        </span>
                      )}
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Add New Item */}
        <div className="px-4 pb-4">
          <Card className="p-3 bg-white">
            <p className="text-sm mb-2">Add Custom Item</p>
            <div className="flex gap-2">
              <Input
                placeholder="Item name..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                className="flex-1"
              />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button
                onClick={addItem}
                size="icon"
                style={{ backgroundColor: 'var(--cathay-jade)' }}
                className="flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Packing List by Category */}
        <div className="px-4 space-y-4">
          {categories.map(category => {
            const categoryItems = items.filter(item => item.category === category);
            const categoryChecked = categoryItems.filter(item => item.checked).length;
            
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm">{category}</h3>
                  <span className="text-xs text-gray-500">
                    {categoryChecked}/{categoryItems.length}
                  </span>
                </div>
                <Card className="p-3 bg-white">
                  <div className="space-y-2">
                    {categoryItems.map(item => (
                      <div 
                        key={item.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="flex-shrink-0"
                        />
                        <span 
                          className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-400' : ''}`}
                        >
                          {item.name}
                        </span>
                        {item.id.length > 2 && ( // Only show delete for custom items
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
