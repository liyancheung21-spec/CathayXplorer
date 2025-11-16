import { useState } from "react";
import { Plane, MapPin, Clock, Bell, Package, Phone, QrCode, Cloud, CalendarCheck, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DiamondExecDialog } from "../DiamondExecDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";

interface TripDashboardScreenProps {
  onViewDeals: () => void;
  onViewReservations?: () => void;
  onNavigateToPackingList?: () => void;
  onBack?: () => void;
}

export function TripDashboardScreen({ onViewDeals, onViewReservations, onNavigateToPackingList, onBack }: TripDashboardScreenProps) {
  const [packingList, setPackingList] = useState({
    passport: true,
    adapter: true,
    camera: false
  });
  const [showDiamondExecDialog, setShowDiamondExecDialog] = useState(false);
  const [showBoardingPass, setShowBoardingPass] = useState(false);
  
  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#008584] px-5 pt-12 pb-6 text-white">
        <div className="max-w-md mx-auto">
          {onBack && (
            <button 
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80">Current Trip</p>
              <h2 className="text-white">Tokyo Cherry Blossom</h2>
            </div>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              Active
            </Badge>
          </div>
          
          {/* Trip Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-white/80">
              <p>Day 1 of 5</p>
              <p>Mar 26, 2025</p>
            </div>
            <Progress value={20} className="h-2 bg-white/20 [&>div]:bg-white" />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-8 max-w-md mx-auto space-y-4">
        {/* Flight Status Card */}
        <Card className="p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#006564] to-[#008584] p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <p className="text-white">Today's Flight</p>
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                On Time
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white">HKG</h1>
                <p className="text-white/80">09:00</p>
              </div>
              <div className="flex-1 flex flex-col items-center px-4">
                <div className="w-full h-0.5 bg-white/30 relative">
                  <Plane className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-white/80 mt-1">4h 30m</p>
              </div>
              <div className="text-right">
                <h1 className="text-white">NRT</h1>
                <p className="text-white/80">13:30</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white space-y-3">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Flight</p>
              <p>CX509</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Gate</p>
              <p>23</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Class</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: 'rgb(226, 166, 105)', color: 'white' }}>
                  Aria Suite
                </span>
                <span className="px-2 py-0.5 text-xs rounded text-white" style={{ backgroundColor: 'rgb(0, 46, 108)', border: '1px solid rgb(0, 46, 108)' }}>
                  Business
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Seat</p>
              <p>12A</p>
            </div>
            <Button className="w-full" variant="outline" onClick={() => setShowBoardingPass(true)}>
              <QrCode className="w-4 h-4 mr-2" />
              Show Boarding Pass
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          <button 
            onClick={onViewReservations}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white hover:bg-mist-gray transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-[#006564]/10 flex items-center justify-center">
              <CalendarCheck className="w-4.5 h-4.5" style={{ color: 'var(--cathay-jade)' }} />
            </div>
            <p className="text-center text-xs">Bookings</p>
          </button>
          <button 
            onClick={onViewDeals}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white hover:bg-mist-gray transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-[#006564]/10 flex items-center justify-center relative">
              <MapPin className="w-4.5 h-4.5" style={{ color: 'var(--cathay-jade)' }} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
            </div>
            <p className="text-center text-xs">Nearby</p>
          </button>
          <button 
            onClick={onNavigateToPackingList}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white hover:bg-mist-gray transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-[#006564]/10 flex items-center justify-center">
              <Package className="w-4.5 h-4.5" style={{ color: 'var(--cathay-jade)' }} />
            </div>
            <p className="text-center text-xs">Packing</p>
          </button>
          <button 
            onClick={() => setShowDiamondExecDialog(true)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white hover:bg-mist-gray transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-[#006564]/10 flex items-center justify-center">
              <MessageCircle className="w-4.5 h-4.5" style={{ color: 'var(--cathay-jade)' }} />
            </div>
            <p className="text-center text-xs">Concierge</p>
          </button>
        </div>

        {/* Today's Itinerary */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3>Today's Plan</h3>
            <Badge variant="outline">Mar 26</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-12 text-center">
                <p className="text-muted-foreground">09:00</p>
              </div>
              <div className="flex-1 pb-4 border-l-2 border-dashed border-border pl-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#006564] flex items-center justify-center -ml-[25px] bg-white border-2 border-[#006564]">
                    <Plane className="w-3 h-3" style={{ color: 'var(--cathay-jade)' }} />
                  </div>
                  <div className="flex-1">
                    <p>Flight CX509</p>
                    <p className="text-muted-foreground">HKG → NRT • 5h 15m</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-12 text-center">
                <p className="text-muted-foreground">15:00</p>
              </div>
              <div className="flex-1 pb-4 border-l-2 border-dashed border-border pl-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center -ml-[25px] border-2 border-[#006564]">
                    🏨
                  </div>
                  <div className="flex-1">
                    <p>Hotel Check-in</p>
                    <p className="text-muted-foreground">Park Hyatt Tokyo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-12 text-center">
                <p className="text-muted-foreground">18:00</p>
              </div>
              <div className="flex-1 pl-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center -ml-[25px] border-2 border-border">
                    🍣
                  </div>
                  <div className="flex-1">
                    <p>Dinner Reservation</p>
                    <p className="text-muted-foreground">Sukiyabashi Jiro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weather & Alerts */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 text-muted-foreground" />
              <p className="text-muted-foreground">Weather</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>18°C</p>
              <p className="text-muted-foreground text-xs">Partly cloudy</p>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <p className="text-muted-foreground">Alerts</p>
            </div>
            <p className="text-[#006564]">3 new</p>
          </Card>
        </div>

        {/* Packing List */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3>Packing List</h3>
            <p className="text-muted-foreground">7/12 packed</p>
          </div>
          <Progress value={58} className="mb-3" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={packingList.passport}
                onChange={(e) => setPackingList({ ...packingList, passport: e.target.checked })}
                className="rounded" 
              />
              <p className="text-muted-foreground line-through">Passport & tickets</p>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={packingList.adapter}
                onChange={(e) => setPackingList({ ...packingList, adapter: e.target.checked })}
                className="rounded" 
              />
              <p className="text-muted-foreground line-through">Travel adapter</p>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={packingList.camera}
                onChange={(e) => setPackingList({ ...packingList, camera: e.target.checked })}
                className="rounded" 
              />
              <p>Camera & chargers</p>
            </div>
          </div>
        </Card>

        {/* Budget Tracker */}
        <Card className="p-4">
          <h3 className="mb-4">Budget Tracker</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground text-sm">Spent</p>
                <p className="text-sm">HKD 3,200 / 8,000</p>
              </div>
              <Progress value={40} />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div>
                <p className="text-muted-foreground">Food</p>
                <p>HKD 1,200</p>
              </div>
              <div>
                <p className="text-muted-foreground">Shopping</p>
                <p>HKD 1,500</p>
              </div>
              <div>
                <p className="text-muted-foreground">Transport</p>
                <p>HKD 500</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <DiamondExecDialog 
        open={showDiamondExecDialog}
        onOpenChange={setShowDiamondExecDialog}
      />

      <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
        <DialogContent className="sm:max-w-[425px] p-0" aria-describedby="boarding-pass-description">
          <DialogHeader className="sr-only">
            <DialogTitle>Boarding Pass</DialogTitle>
            <DialogDescription id="boarding-pass-description">
              Your electronic boarding pass for flight CX509 from Hong Kong to Tokyo Narita
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden">
            {/* Boarding Pass Header */}
            <div className="bg-gradient-to-r from-[#006564] to-[#008584] p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-5 h-5" />
                <p className="text-white">Cathay Pacific</p>
              </div>
              <h2 className="text-white mb-1">Boarding Pass</h2>
              <p className="text-white/80 text-sm">Electronic Ticket</p>
            </div>

            {/* Boarding Pass Content */}
            <div className="p-6 space-y-6">
              {/* Passenger Info */}
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">PASSENGER NAME</p>
                <p className="text-xs">CHAN/JACKMR</p>
              </div>

              {/* Flight Route */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">FROM</p>
                  <p className="text-xl">HKG</p>
                  <p className="text-xs text-muted-foreground">Hong Kong</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-1">
                  <Plane className="w-3.5 h-3.5 text-muted-foreground mb-0.5" />
                  <div className="w-full h-0.5 bg-border" />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-muted-foreground mb-0.5">TO</p>
                  <p className="text-xl">NRT</p>
                  <p className="text-xs text-muted-foreground">Tokyo Narita</p>
                </div>
              </div>

              <Separator />

              {/* Flight Details Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">FLIGHT</p>
                  <p>CX509</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">DATE</p>
                  <p>26 MAR</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">TIME</p>
                  <p>08:30</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">GATE</p>
                  <p>23</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">SEAT</p>
                  <p>12A</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">CLASS</p>
                  <p>Business</p>
                </div>
              </div>

              <Separator />

              {/* Barcode */}
              <div className="space-y-1.5">
                <div className="bg-white border border-[#006564] rounded p-2">
                  {/* Mock Barcode */}
                  <svg viewBox="0 0 200 60" className="w-full h-10">
                    <rect width="200" height="60" fill="white"/>
                    {/* Barcode pattern */}
                    {Array.from({ length: 40 }).map((_, i) => {
                      const shouldFill = (i % 3 === 0 || i % 5 === 0);
                      const width = shouldFill ? 4 : 2;
                      return (
                        <rect 
                          key={i}
                          x={i * 5} 
                          y={5} 
                          width={width} 
                          height={50} 
                          fill="black"
                        />
                      );
                    })}
                  </svg>
                  <p className="text-center text-xs mt-1 font-mono">CX509 HKG-NRT 26MAR25</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={() => {
                    alert('Boarding pass saved to your device');
                  }}
                >
                  Save to Wallet
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs text-white"
                  style={{ backgroundColor: 'var(--cathay-jade)' }}
                  onClick={() => setShowBoardingPass(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}