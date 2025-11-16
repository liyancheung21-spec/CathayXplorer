import { useState } from "react";
import { Heart, Bookmark, Share2, User, Clock, MapPin, Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface JourneyPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    level: string;
  };
  destination: string;
  country: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  category: 'food' | 'culture' | 'adventure' | 'luxury' | 'hidden-gem';
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags: string[];
}

// Cathay Official & Trending Posts
const trendingPosts: JourneyPost[] = [
  {
    id: 't1',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Bali',
    country: 'Indonesia',
    title: 'Sunrise at Uluwatu Temple',
    description: 'Experience the magical sunrise at this clifftop temple, followed by traditional Kecak fire dance performances.',
    image: 'https://images.unsplash.com/photo-1613278435217-de4e5a91a4ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwc3Vuc2V0fGVufDF8fHx8MTc2MTE1MzI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '7 days',
    category: 'culture',
    likes: 1289,
    tags: ['Temple', 'Sunrise', 'Traditional Dance']
  },
  {
    id: 't2',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Paris',
    country: 'France',
    title: 'Secret Cafés & Patisseries',
    description: 'Beyond the tourist traps - where Parisians actually get their morning croissants and café au lait.',
    image: 'https://images.unsplash.com/photo-1686317508857-3b91999d6ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGNhZmV8ZW58MXx8fHwxNzYxMTUzMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'luxury',
    likes: 892,
    tags: ['Café Culture', 'Pastries', 'Hidden Gems']
  },
  {
    id: 't3',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Bangkok',
    country: 'Thailand',
    title: 'Floating Markets at Dawn',
    description: 'Visit Damnoen Saduak floating market early morning for an authentic experience away from crowds.',
    image: 'https://images.unsplash.com/photo-1546945344-e830559a0601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwZmxvYXRpbmclMjBtYXJrZXR8ZW58MXx8fHwxNzYxMTUzMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'culture',
    likes: 1045,
    tags: ['Markets', 'Local Life', 'Photography']
  },
  {
    id: 't4',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Singapore',
    country: 'Singapore',
    title: 'Gardens by the Bay After Dark',
    description: 'The iconic Supertrees come alive at night with a stunning light and sound show. Don\'t miss the Cloud Forest.',
    image: 'https://images.unsplash.com/photo-1558289675-f8a783516e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBnYXJkZW5zfGVufDF8fHx8MTc2MTE1MzczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3 days',
    category: 'culture',
    likes: 2156,
    tags: ['Gardens', 'Night Views', 'Architecture']
  },
  {
    id: 't5',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Maldives',
    country: 'Maldives',
    title: 'Overwater Villa Paradise',
    description: 'Ultimate luxury escape with crystal-clear waters, world-class diving, and unforgettable sunsets.',
    image: 'https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2MTA2NDU3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'luxury',
    likes: 3421,
    tags: ['Beach', 'Luxury Resort', 'Diving']
  },
  {
    id: 't6',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Switzerland',
    country: 'Switzerland',
    title: 'Alpine Adventure in the Jungfrau',
    description: 'Breathtaking mountain views, scenic train rides, and charming Swiss villages. A must for nature lovers.',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjExMjYzODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'adventure',
    likes: 1876,
    tags: ['Mountains', 'Hiking', 'Scenic Railways']
  },
  {
    id: 't7',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Sydney',
    country: 'Australia',
    title: 'Harbour City Highlights',
    description: 'From the Opera House to Bondi Beach, discover the best of Sydney\'s iconic landmarks and hidden coastal gems.',
    image: 'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeWRuZXklMjBvcGVyYSUyMGhvdXNlfGVufDF8fHx8MTc2MTEwNTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'culture',
    likes: 1654,
    tags: ['Beaches', 'City Life', 'Iconic Landmarks']
  },
  {
    id: 't8',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Iceland',
    country: 'Iceland',
    title: 'Chasing Northern Lights & Glaciers',
    description: 'Experience the magical Aurora Borealis, explore ice caves, and soak in the famous Blue Lagoon hot springs.',
    image: 'https://images.unsplash.com/photo-1488415032361-b7e238421f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VsYW5kJTIwbm9ydGhlcm4lMjBsaWdodHN8ZW58MXx8fHwxNzYxMDQ3ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '8 days',
    category: 'adventure',
    likes: 4567,
    tags: ['Northern Lights', 'Glaciers', 'Hot Springs']
  },
  {
    id: 't9',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Santorini',
    country: 'Greece',
    title: 'Sunset Views & White Villages',
    description: 'Picture-perfect whitewashed buildings, stunning sunsets in Oia, and delicious Mediterranean cuisine.',
    image: 'https://images.unsplash.com/photo-1669203408570-4140ee21f211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBzdW5zZXR8ZW58MXx8fHwxNzYxMTQ5MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'luxury',
    likes: 3892,
    tags: ['Sunset', 'Greek Islands', 'Romance']
  },
  {
    id: 't10',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Kyoto',
    country: 'Japan',
    title: 'Zen Gardens & Bamboo Forests',
    description: 'Walk through the enchanting Arashiyama Bamboo Grove and explore ancient temples and traditional tea houses.',
    image: 'https://images.unsplash.com/photo-1649009792206-d8ddb5e18914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGJhbWJvbyUyMGZvcmVzdHxlbnwxfHx8fDE3NjEwOTY0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'culture',
    likes: 2734,
    tags: ['Temples', 'Nature', 'Traditional Japan']
  },
  {
    id: 't11',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Barcelona',
    country: 'Spain',
    title: 'Gaudí\'s Architectural Wonders',
    description: 'Marvel at Sagrada Familia, Park Güell, and Casa Batlló while enjoying tapas and vibrant nightlife.',
    image: 'https://images.unsplash.com/photo-1653677903266-1d814985b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYxMDQwMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'culture',
    likes: 2156,
    tags: ['Architecture', 'Art', 'Spanish Food']
  },
  {
    id: 't12',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Phuket',
    country: 'Thailand',
    title: 'Island Hopping & Beach Bliss',
    description: 'Explore the stunning Phi Phi Islands, pristine beaches, and indulge in fresh seafood at beach clubs.',
    image: 'https://images.unsplash.com/photo-1708656705549-14bcdf9b4921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaHxlbnwxfHx8fDE3NjExNTQwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'luxury',
    likes: 1923,
    tags: ['Islands', 'Beach', 'Snorkeling']
  },
  {
    id: 't13',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Amsterdam',
    country: 'Netherlands',
    title: 'Canals, Bikes & Museums',
    description: 'Cycle through charming streets, visit world-class museums, and enjoy cozy canal-side cafés.',
    image: 'https://images.unsplash.com/photo-1556654953-2205826b17a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXN0ZXJkYW0lMjBjYW5hbHxlbnwxfHx8fDE3NjExMTM4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'culture',
    likes: 1567,
    tags: ['Cycling', 'Art', 'Canals']
  },
  {
    id: 't14',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Rome',
    country: 'Italy',
    title: 'Ancient History & Italian Cuisine',
    description: 'Walk through 2,000 years of history from the Colosseum to Vatican City, with authentic pasta on every corner.',
    image: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtfGVufDF8fHx8MTc2MTAzNjIyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'culture',
    likes: 2890,
    tags: ['History', 'Italian Food', 'Ancient Ruins']
  },
  {
    id: 't15',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Marrakech',
    country: 'Morocco',
    title: 'Souks, Riads & Moroccan Flavors',
    description: 'Get lost in vibrant souks, stay in traditional riads, and savor tagines under the stars.',
    image: 'https://images.unsplash.com/photo-1672753325594-6ed7cd706380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJyYWtlY2glMjBtYXJrZXR8ZW58MXx8fHwxNzYxMTU0MDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'culture',
    likes: 1678,
    tags: ['Markets', 'Moroccan Food', 'Traditional']
  },
  {
    id: 't16',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Machu Picchu',
    country: 'Peru',
    title: 'Inca Trail to Lost City',
    description: 'Trek through the Andes to reach the breathtaking ancient Inca citadel perched in the clouds.',
    image: 'https://images.unsplash.com/photo-1600913248959-c1752bdd05e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwbWFjaHUlMjBwaWNjaHV8ZW58MXx8fHwxNzYxMDYyMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '8 days',
    category: 'adventure',
    likes: 5234,
    tags: ['Hiking', 'Ancient Ruins', 'Mountains']
  },
  {
    id: 't17',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Istanbul',
    country: 'Turkey',
    title: 'Where East Meets West',
    description: 'Explore grand mosques, bustling bazaars, and savor authentic Turkish delights in this transcontinental gem.',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMG1vc3F1ZXxlbnwxfHx8fDE3NjExNTQwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'culture',
    likes: 2445,
    tags: ['Mosques', 'Bazaars', 'Turkish Cuisine']
  },
  {
    id: 't18',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Norwegian Fjords',
    country: 'Norway',
    title: 'Cruise Through Dramatic Landscapes',
    description: 'Sail through majestic fjords, witness towering waterfalls, and experience Nordic nature at its finest.',
    image: 'https://images.unsplash.com/photo-1656490246727-a58085b306d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBmam9yZHN8ZW58MXx8fHwxNzYxMDUzMjMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '7 days',
    category: 'adventure',
    likes: 3156,
    tags: ['Fjords', 'Cruise', 'Nature']
  },
  {
    id: 't19',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Ubud',
    country: 'Indonesia',
    title: 'Rice Terraces & Wellness Retreat',
    description: 'Find tranquility in lush rice paddies, jungle yoga sessions, and traditional Balinese healing ceremonies.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2V8ZW58MXx8fHwxNzYxMDkyNDU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'luxury',
    likes: 2789,
    tags: ['Wellness', 'Nature', 'Yoga']
  },
  {
    id: 't20',
    author: { name: 'Cathay Xplorer', level: 'Official' },
    destination: 'Prague',
    country: 'Czech Republic',
    title: 'Fairytale City & Beer Culture',
    description: 'Wander through medieval streets, visit Prague Castle, and sample world-famous Czech beers.',
    image: 'https://images.unsplash.com/photo-1654084747154-0b21cfd57aa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmFndWUlMjBjYXN0bGV8ZW58MXx8fHwxNzYxMDUzMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'culture',
    likes: 1934,
    tags: ['Medieval', 'Beer', 'Architecture']
  }
];

// Community User Posts
const communityPosts: JourneyPost[] = [
  {
    id: 'c1',
    author: { name: 'Sarah Chen', level: 'Cathay Gold' },
    destination: 'Tokyo',
    country: 'Japan',
    title: 'Hidden Ramen Gems in Shibuya',
    description: 'Discovered the most authentic ramen spots locals actually visit. The tsukemen at Rokurinsha is life-changing!',
    image: 'https://images.unsplash.com/photo-1679862669461-a3b513673919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzYxMDUyOTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'food',
    likes: 342,
    tags: ['Ramen', 'Street Food', 'Local Favorites']
  },
  {
    id: 'c2',
    author: { name: 'Michael Wong', level: 'Cathay Diamond' },
    destination: 'Hong Kong',
    country: 'Hong Kong SAR',
    title: 'Night Market Food Crawl',
    description: 'Temple Street to Mong Kok - the ultimate guide to Hong Kong\'s best street food after dark.',
    image: 'https://images.unsplash.com/photo-1698416286339-7edbf0922953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25nJTIwa29uZyUyMHNreWxpbmUlMjBuaWdodHxlbnwxfHx8fDE3NjExNTMyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3 days',
    category: 'food',
    likes: 567,
    tags: ['Night Markets', 'Street Food', 'Local Culture']
  },
  {
    id: 'c3',
    author: { name: 'Emma Roberts', level: 'Cathay Green' },
    destination: 'Dubai',
    country: 'UAE',
    title: 'Desert Safari & Bedouin Dinner',
    description: 'An unforgettable evening under the stars with authentic Bedouin cuisine and traditional entertainment.',
    image: 'https://images.unsplash.com/photo-1576159470850-494c8b17aca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGRlc2VydHxlbnwxfHx8fDE3NjExNTMyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'adventure',
    likes: 724,
    tags: ['Desert', 'Adventure', 'Cultural Experience']
  },
  {
    id: 'c4',
    author: { name: 'David Kim', level: 'Cathay Gold' },
    destination: 'Seoul',
    country: 'South Korea',
    title: 'K-Pop & Street Food Adventure',
    description: 'From Gangnam to Myeongdong, exploring Seoul\'s vibrant nightlife, shopping, and incredible street food scene.',
    image: 'https://images.unsplash.com/photo-1682090369590-c4c82f3cc065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMHN0cmVldCUyMG5pZ2h0fGVufDF8fHx8MTc2MTE1MzczMnww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'culture',
    likes: 983,
    tags: ['K-Pop', 'Nightlife', 'Shopping']
  },
  {
    id: 'c5',
    author: { name: 'Lisa Tan', level: 'Cathay Green' },
    destination: 'Taipei',
    country: 'Taiwan',
    title: 'Night Market Food Paradise',
    description: 'Shilin, Raohe, Ningxia - a complete guide to Taipei\'s best night markets and must-try dishes.',
    image: 'https://images.unsplash.com/photo-1583889659384-64d9df2347ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWl3YW4lMjBuaWdodCUyMG1hcmtldHxlbnwxfHx8fDE3NjExNTM3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3 days',
    category: 'food',
    likes: 612,
    tags: ['Night Markets', 'Taiwanese Food', 'Local Life']
  },
  {
    id: 'c6',
    author: { name: 'James Foster', level: 'Cathay Diamond' },
    destination: 'London',
    country: 'United Kingdom',
    title: 'Historic Pubs & Hidden Courtyards',
    description: 'A walking tour through London\'s most charming hidden spots, historic pubs, and secret gardens.',
    image: 'https://images.unsplash.com/photo-1654271166015-d87ab7097752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYxMDQwMjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'culture',
    likes: 845,
    tags: ['History', 'Architecture', 'Hidden Gems']
  },
  {
    id: 'c7',
    author: { name: 'Maria Garcia', level: 'Cathay Gold' },
    destination: 'New York',
    country: 'United States',
    title: 'NYC Food Tour Beyond Manhattan',
    description: 'Discover authentic eats in Brooklyn, Queens, and the Bronx - where real New Yorkers eat.',
    image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eXxlbnwxfHx8fDE3NjEwNTM3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'food',
    likes: 1123,
    tags: ['Food Tour', 'Urban Exploration', 'Authentic Eats']
  },
  {
    id: 'c8',
    author: { name: 'Alex Nguyen', level: 'Cathay Green' },
    destination: 'Da Nang',
    country: 'Vietnam',
    title: 'Beach Hopping & Banh Mi Hunt',
    description: 'Perfect blend of beach relaxation and culinary adventures. The banh mi here is absolutely legendary.',
    image: 'https://images.unsplash.com/photo-1585155683190-0e92394ac1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwYmVhY2h8ZW58MXx8fHwxNzYxMTUzNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'food',
    likes: 456,
    tags: ['Beaches', 'Vietnamese Food', 'Coastal Life']
  },
  {
    id: 'c9',
    author: { name: 'Sophie Martin', level: 'Cathay Diamond' },
    destination: 'Buenos Aires',
    country: 'Argentina',
    title: 'Tango, Steaks & Wine',
    description: 'Immerse yourself in passionate tango shows, world-class steakhouses, and Malbec wine tasting.',
    image: 'https://images.unsplash.com/photo-1580414225001-a2496caf3453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWVub3MlMjBhaXJlcyUyMHRhbmdvfGVufDF8fHx8MTc2MTE1NDA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '7 days',
    category: 'luxury',
    likes: 1456,
    tags: ['Tango', 'Steakhouses', 'Wine']
  },
  {
    id: 'c10',
    author: { name: 'Robert MacLeod', level: 'Cathay Gold' },
    destination: 'Scottish Highlands',
    country: 'Scotland',
    title: 'Whisky Trail & Castle Exploration',
    description: 'Tour historic distilleries, explore ancient castles, and experience the raw beauty of the Highlands.',
    image: 'https://images.unsplash.com/photo-1589489873423-d1745278a8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY290dGlzaCUyMGhpZ2hsYW5kc3xlbnwxfHx8fDE3NjExNTQwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6 days',
    category: 'adventure',
    likes: 892,
    tags: ['Whisky', 'Castles', 'Nature']
  },
  {
    id: 'c11',
    author: { name: 'Fatima Hassan', level: 'Cathay Green' },
    destination: 'Sahara Desert',
    country: 'Morocco',
    title: 'Camel Trek & Starry Nights',
    description: 'Sleep under the stars in a luxury desert camp after an unforgettable camel caravan journey.',
    image: 'https://images.unsplash.com/photo-1662009867642-933d25d401fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwZGVzZXJ0fGVufDF8fHx8MTc2MTA3MTQwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'adventure',
    likes: 1234,
    tags: ['Desert', 'Camping', 'Stargazing']
  },
  {
    id: 'c12',
    author: { name: 'Kevin Zhang', level: 'Cathay Diamond' },
    destination: 'Vancouver',
    country: 'Canada',
    title: 'Mountains Meet Ocean',
    description: 'Ski in the morning, kayak in the afternoon - Vancouver offers the best of both worlds plus amazing food.',
    image: 'https://images.unsplash.com/photo-1730661906876-18bfc6e95f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5jb3V2ZXIlMjBjaXR5fGVufDF8fHx8MTc2MTE1NDA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5 days',
    category: 'adventure',
    likes: 765,
    tags: ['Skiing', 'Ocean', 'Nature']
  },
  {
    id: 'c13',
    author: { name: 'Yuki Tanaka', level: 'Cathay Gold' },
    destination: 'Shanghai',
    country: 'China',
    title: 'Future Meets Tradition',
    description: 'Experience futuristic skyscrapers, historic temples, and world-class dim sum in China\'s most dynamic city.',
    image: 'https://images.unsplash.com/photo-1627484986972-e544190b8abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFuZ2hhaSUyMHNreWxpbmV8ZW58MXx8fHwxNzYxMTE4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 days',
    category: 'culture',
    likes: 934,
    tags: ['Skyline', 'Dim Sum', 'Modern City']
  }
];

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'luxury', label: 'Luxury', icon: '✨' },
  { id: 'hidden-gem', label: 'Hidden Gems', icon: '💎' }
];

interface InspirationScreenProps {
  onJournalClick?: (journal: JourneyPost) => void;
  onShareMomentClick?: () => void;
}

export function InspirationScreen({ onJournalClick, onShareMomentClick }: InspirationScreenProps = {}) {
  const [activeTab, setActiveTab] = useState<'trending' | 'community'>('trending');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filterByCategory = (posts: JourneyPost[]) => {
    return selectedCategory === 'all' 
      ? posts 
      : posts.filter(post => post.category === selectedCategory);
  };

  const renderJourneyCard = (post: JourneyPost) => {
    const isLiked = likedPosts.has(post.id);
    const isSaved = savedPosts.has(post.id);

    return (
      <Card 
        key={post.id} 
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onJournalClick?.(post)}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => toggleSave(post.id)}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <Bookmark 
                className="w-4 h-4" 
                fill={isSaved ? 'var(--cathay-jade)' : 'none'}
                style={{ color: isSaved ? 'var(--cathay-jade)' : 'var(--charcoal)' }}
              />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          {post.author.level === 'Official' && (
            <div 
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-white backdrop-blur-sm"
              style={{ backgroundColor: 'var(--cathay-jade)' }}
            >
              <p className="text-xs text-white">Cathay Picks</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Author */}
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: 'var(--cathay-jade-light)' }}
            >
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.level}</p>
            </div>
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: 'var(--cathay-gold)', color: 'var(--cathay-gold)' }}
            >
              {post.category}
            </Badge>
          </div>

          {/* Location & Duration */}
          <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{post.destination}, {post.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.duration}</span>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="mb-1">{post.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{post.description}</p>

          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex items-center gap-1.5 hover:scale-105 transition-transform"
            >
              <Heart 
                className="w-5 h-5" 
                fill={isLiked ? '#d4183d' : 'none'}
                style={{ color: isLiked ? '#d4183d' : 'var(--muted-foreground)' }}
              />
              <span 
                className="text-sm"
                style={{ color: isLiked ? '#d4183d' : 'var(--muted-foreground)' }}
              >
                {post.likes + (isLiked ? 1 : 0)}
              </span>
            </button>
            <button 
              className="text-sm px-3 py-1.5 rounded-lg hover:bg-mist-gray transition-colors"
              style={{ color: 'var(--cathay-jade)' }}
            >
              View Journey
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-5 pt-12 pb-6 text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-white mb-2">Inspirations by Cathay</h1>
          <p className="text-white/80 mb-4">Discover journeys, experiences & hidden gems</p>
          <button 
            onClick={() => onShareMomentClick?.()}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors border border-white/30"
            aria-label="Share your travel moment with the community"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            <span>Share your moment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="max-w-md mx-auto px-5 py-5">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-12">
              <TabsTrigger value="trending" className="data-[state=active]:text-[#006564]">
                Trending Now
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:text-[#006564]">
                Community
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Category Filter */}
          <div className="py-3 border-b border-border">
            <div 
              className="flex gap-2 overflow-x-auto scrollbar-hide"
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                const Icon = category.icon;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex-shrink-0 px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                    style={{
                      backgroundColor: isActive ? 'var(--cathay-jade)' : 'var(--mist-gray)',
                      color: isActive ? 'white' : 'var(--charcoal)'
                    }}
                  >
                    {typeof Icon === 'string' ? (
                      <span>{Icon}</span>
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Areas */}
      <div className="px-5 pt-4 max-w-md mx-auto space-y-4">
        {filterByCategory(activeTab === 'trending' ? trendingPosts : communityPosts).map(renderJourneyCard)}
      </div>

      {/* Empty State */}
      {filterByCategory(activeTab === 'trending' ? trendingPosts : communityPosts).length === 0 && (
        <div className="px-5 pt-12 max-w-md mx-auto text-center">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: 'var(--mist-gray)' }}
          >
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2">No journeys yet</h3>
          <p className="text-muted-foreground">
            Check back soon for inspiring travel stories
          </p>
        </div>
      )}
    </div>
  );
}