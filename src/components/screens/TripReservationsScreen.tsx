import { ArrowLeft, Calendar, MapPin, QrCode, ExternalLink, Copy, Download, Check, Ticket, Utensils, Train, Hotel, Car, Palmtree, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface Reservation {
  id: string;
  type: 'attraction' | 'restaurant' | 'transport' | 'hotel' | 'activity';
  name: string;
  date: string;
  time?: string;
  confirmationCode: string;
  location: string;
  status: 'confirmed' | 'pending' | 'waitlist';
  details: string[];
  qrCode?: string;
  bookingReference?: string;
  instructions?: string;
}

interface TripReservationsScreenProps {
  onBack: () => void;
  tripTitle: string;
  tripDates: string;
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    type: 'attraction',
    name: 'teamLab Borderless',
    date: 'Dec 24, 2024',
    time: '18:00',
    confirmationCode: 'TLB-2024-HK8392',
    location: 'Azabudai Hills, Tokyo',
    status: 'confirmed',
    details: [
      '2 Adult Tickets',
      'Entry Time: 18:00 - 19:00',
      'Arrive 15 mins early'
    ],
    qrCode: '🎫',
    instructions: 'Please present QR code at entrance. No refunds for late arrival.'
  },
  {
    id: '2',
    type: 'restaurant',
    name: 'Sushi Saito Omakase',
    date: 'Dec 25, 2024',
    time: '19:30',
    confirmationCode: 'SSO-251224-2A',
    location: 'Roppongi, Tokyo',
    status: 'confirmed',
    details: [
      '2 Guests',
      'Omakase Course ¥45,000/person',
      'Counter seating',
      'No photography policy'
    ],
    instructions: 'Smart casual dress code required. Please call if running late.'
  },
  {
    id: '3',
    type: 'transport',
    name: 'JR Pass (7-Day)',
    date: 'Dec 23 - Dec 29, 2024',
    confirmationCode: 'JRP-2024-998877',
    location: 'Valid nationwide',
    status: 'confirmed',
    details: [
      '2 Adult Ordinary Passes',
      'Exchange at Tokyo Station',
      'Must activate before Dec 30',
      'Includes Shinkansen (except Nozomi/Mizuho)'
    ],
    bookingReference: 'Pick up at JR East Travel Service Center',
    instructions: 'Bring passport and exchange order when collecting passes.'
  },
  {
    id: '4',
    type: 'hotel',
    name: 'Aman Tokyo',
    date: 'Dec 23 - Dec 26, 2024',
    confirmationCode: 'AMAN-TYO-456123',
    location: 'Otemachi Tower, Tokyo',
    status: 'confirmed',
    details: [
      'Premier Room, King Bed',
      '3 nights',
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Breakfast included'
    ],
    instructions: 'Early check-in available upon request. Contact concierge for airport transfer.'
  },
  {
    id: '5',
    type: 'hotel',
    name: 'Beniya Mukayu Ryokan',
    date: 'Dec 26 - Dec 27, 2024',
    confirmationCode: 'BMR-261224-88',
    location: 'Yamashiro Onsen, Ishikawa',
    status: 'confirmed',
    details: [
      'Japanese-style Room with Private Onsen',
      '1 night',
      'Kaiseki dinner & breakfast included',
      'Complimentary shuttle from Kaga Onsen Station'
    ],
    instructions: 'Please inform if dietary restrictions. Yukata provided in room.'
  },
  {
    id: '6',
    type: 'activity',
    name: 'Mt. Fuji Sunrise Tour',
    date: 'Dec 28, 2024',
    time: '04:00',
    confirmationCode: 'FUJI-SR-281224',
    location: 'Pick-up: Shinjuku Station West Exit',
    status: 'confirmed',
    details: [
      '2 Participants',
      'Includes guide & transportation',
      'Lake Kawaguchi viewpoint',
      'Duration: 8 hours'
    ],
    instructions: 'Dress warmly. Bring camera and water. Tour may be cancelled due to weather.'
  },
  {
    id: '7',
    type: 'restaurant',
    name: 'Narisawa',
    date: 'Dec 27, 2024',
    time: '18:00',
    confirmationCode: 'NRS-271224-4B',
    location: 'Minato, Tokyo',
    status: 'waitlist',
    details: [
      '2 Guests',
      'Innovative Satoyama Cuisine',
      'Wine pairing available',
      'Waitlist position: 3'
    ],
    instructions: 'We will contact you 48 hours before if a table becomes available.'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'attraction':
      return <Ticket className="w-5 h-5" />;
    case 'restaurant':
      return <Utensils className="w-5 h-5" />;
    case 'transport':
      return <Train className="w-5 h-5" />;
    case 'hotel':
      return <Hotel className="w-5 h-5" />;
    case 'activity':
      return <Palmtree className="w-5 h-5" />;
    default:
      return <Calendar className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'attraction':
      return '#C7A567'; // Gold
    case 'restaurant':
      return '#006564'; // Jade
    case 'transport':
      return '#367D79'; // Medium Jade
    case 'hotel':
      return '#C1B49A'; // Sand
    case 'activity':
      return '#006564'; // Jade
    default:
      return '#006564';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case 'waitlist':
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Waitlist</Badge>;
    default:
      return null;
  }
};

export function TripReservationsScreen({ onBack, tripTitle, tripDates }: TripReservationsScreenProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [allQrDialogOpen, setAllQrDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const handleViewQR = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setQrDialogOpen(true);
  };

  const confirmedCount = mockReservations.filter(r => r.status === 'confirmed').length;
  const waitlistCount = mockReservations.filter(r => r.status === 'waitlist').length;
  
  // Filter reservations that have QR codes
  const reservationsWithQR = mockReservations.filter(r => r.qrCode);

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-mist-gray rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="font-medium">All Bookings</h1>
            <p className="text-xs text-muted-foreground">{tripTitle}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="p-2 -mr-2"
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{tripDates}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {confirmedCount} confirmed
              </span>
              {waitlistCount > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-orange-600">
                    {waitlistCount} waitlist
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 space-y-4">
        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Quick Actions</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export All
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setAllQrDialogOpen(true)}>
              <QrCode className="w-3.5 h-3.5 mr-1.5" />
              View QR Codes
            </Button>
          </div>
        </Card>

        {/* Reservations List */}
        <div className="space-y-3">
          {mockReservations.map((reservation) => (
            <Card key={reservation.id} className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getTypeColor(reservation.type)}15` }}
                  >
                    <span style={{ color: getTypeColor(reservation.type) }}>
                      {getTypeIcon(reservation.type)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{reservation.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{reservation.location}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(reservation.status)}
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{reservation.date}</span>
                </div>
                {reservation.time && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span>{reservation.time}</span>
                  </>
                )}
              </div>

              <Separator />

              {/* Confirmation Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confirmation Code</span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm px-2 py-1 bg-mist-gray rounded">
                      {reservation.confirmationCode}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopyCode(reservation.confirmationCode, reservation.id)}
                    >
                      {copiedId === reservation.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {reservation.bookingReference && (
                  <p className="text-xs text-muted-foreground">
                    {reservation.bookingReference}
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-1.5">
                {reservation.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span className="text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              {reservation.instructions && (
                <div 
                  className="px-3 py-2 rounded-lg text-xs"
                  style={{ backgroundColor: 'rgba(0, 101, 100, 0.05)' }}
                >
                  <p style={{ color: 'var(--cathay-jade)' }}>
                    ℹ️ {reservation.instructions}
                  </p>
                </div>
              )}

              {/* QR Code */}
              {reservation.qrCode && (
                <Button variant="outline" className="w-full" size="sm" onClick={() => handleViewQR(reservation)}>
                  <QrCode className="w-4 h-4 mr-2" />
                  View QR Code
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="p-4 space-y-2" style={{ backgroundColor: 'rgba(199, 165, 103, 0.05)' }}>
          <h3 className="text-sm">Need Help?</h3>
          <p className="text-xs text-muted-foreground">
            Contact our 24/7 travel concierge for booking changes or questions.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            style={{ borderColor: 'var(--cathay-gold)', color: 'var(--cathay-gold)' }}
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Contact Concierge
          </Button>
        </Card>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedReservation?.name}</DialogTitle>
            <DialogDescription>
              Scan this QR code at {selectedReservation?.location}
            </DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              {/* QR Code Display */}
              <div className="flex flex-col items-center justify-center py-6">
                <div 
                  className="w-64 h-64 border-4 rounded-xl flex items-center justify-center bg-white"
                  style={{ borderColor: getTypeColor(selectedReservation.type) }}
                >
                  {/* Mock QR Code Pattern */}
                  <svg viewBox="0 0 100 100" className="w-56 h-56">
                    <rect width="100" height="100" fill="white"/>
                    {/* QR code pattern simulation */}
                    {Array.from({ length: 10 }).map((_, i) => 
                      Array.from({ length: 10 }).map((_, j) => {
                        const shouldFill = (i + j + parseInt(selectedReservation.id)) % 3 === 0;
                        return shouldFill ? (
                          <rect 
                            key={`${i}-${j}`}
                            x={i * 10} 
                            y={j * 10} 
                            width="9" 
                            height="9" 
                            fill="black"
                          />
                        ) : null;
                      })
                    )}
                  </svg>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 p-4 bg-mist-gray rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date & Time</span>
                  <span className="text-sm">
                    {selectedReservation.date}
                    {selectedReservation.time && ` at ${selectedReservation.time}`}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confirmation Code</span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm px-2 py-1 bg-white rounded">
                      {selectedReservation.confirmationCode}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopyCode(selectedReservation.confirmationCode, selectedReservation.id)}
                    >
                      {copiedId === selectedReservation.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(selectedReservation.status)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    // Mock download functionality
                    alert('QR Code downloaded to your device');
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-white"
                  style={{ backgroundColor: 'var(--cathay-jade)' }}
                  onClick={() => setQrDialogOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* All QR Codes Dialog */}
      <Dialog open={allQrDialogOpen} onOpenChange={setAllQrDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All QR Codes ({reservationsWithQR.length})</DialogTitle>
            <DialogDescription>
              Scan these QR codes at their respective locations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {reservationsWithQR.map((reservation, index) => (
              <div key={reservation.id}>
                {index > 0 && <Separator className="my-6" />}
                <div className="space-y-4">
                  <h3 className="text-center">{reservation.name}</h3>
                  <p className="text-sm text-center text-muted-foreground">{reservation.location}</p>
                  
                  {/* QR Code Display */}
                  <div className="flex flex-col items-center justify-center py-4">
                    <div 
                      className="w-48 h-48 border-4 rounded-xl flex items-center justify-center bg-white"
                      style={{ borderColor: getTypeColor(reservation.type) }}
                    >
                      {/* Mock QR Code Pattern */}
                      <svg viewBox="0 0 100 100" className="w-44 h-44">
                        <rect width="100" height="100" fill="white"/>
                        {/* QR code pattern simulation */}
                        {Array.from({ length: 10 }).map((_, i) => 
                          Array.from({ length: 10 }).map((_, j) => {
                            const shouldFill = (i + j + parseInt(reservation.id)) % 3 === 0;
                            return shouldFill ? (
                              <rect 
                                key={`${i}-${j}`}
                                x={i * 10} 
                                y={j * 10} 
                                width="9" 
                                height="9" 
                                fill="black"
                              />
                            ) : null;
                          })
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2 p-3 bg-mist-gray rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span>
                        {reservation.date}
                        {reservation.time && ` at ${reservation.time}`}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Code</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs px-2 py-1 bg-white rounded">
                          {reservation.confirmationCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyCode(reservation.confirmationCode, reservation.id)}
                        >
                          {copiedId === reservation.id ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      {getStatusBadge(reservation.status)}
                    </div>
                  </div>

                  {/* Individual Download Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      alert(`QR Code for ${reservation.name} downloaded to your device`);
                    }}
                  >
                    <Download className="w-3.5 h-3.5 mr-2" />
                    Download This QR Code
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-6 px-6 border-t mt-4">
            <Button
              size="sm"
              className="w-full text-white"
              style={{ backgroundColor: 'var(--cathay-jade)' }}
              onClick={() => setAllQrDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}