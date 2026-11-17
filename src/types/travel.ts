export type TourCategory = 'all' | 'international' | 'domestic' | 'summer' | 'tet';

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
  hotel: string;
  activities: string[];
}

export interface TourReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  category: 'international' | 'domestic' | 'summer' | 'tet';
  destinationId: string;
  destinationName: string;
  location: string;
  duration: string; // e.g. "5N4Đ", "4N3Đ", "3N2Đ"
  rating: number;
  reviewCount: number;
  originalPrice: number;
  salePrice: number;
  discountBadge: string;
  image: string;
  gallery: string[];
  departureSchedule: string;
  transportation: string;
  departureDates: string[];
  highlights: string[];
  itinerary: TourItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  reviews: TourReview[];
  featured?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  isDomestic: boolean;
  tourCount: number;
  image: string;
  description: string;
  highlights: string[];
}

export interface HotelRoom {
  name: string;
  bed: string;
  maxGuests: number;
  price: number;
  originalPrice: number;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  destinationId: string;
  starRating: number;
  ratingScore: number;
  reviewCount: number;
  address: string;
  pricePerNight: number;
  originalPrice: number;
  image: string;
  gallery: string[];
  amenities: string[];
  badges: string[];
  description: string;
  rooms: HotelRoom[];
}

export interface TravelCombo {
  id: string;
  title: string;
  destinationName: string;
  duration: string; // "3N2Đ", "4N3Đ"
  airline: string;
  hotelName: string;
  hotelStars: number;
  originalPrice: number;
  comboPrice: number;
  discountPercent: number;
  departureFrom: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  validUntil: string;
}

export interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  departureDate: string;
  adults: number;
  children: number;
  notes: string;
  paymentMethod: 'bank_transfer' | 'credit_card' | 'cash';
  voucherCode: string;
}

export interface ConfirmedBooking {
  bookingId: string;
  itemType: 'tour' | 'hotel' | 'combo';
  title: string;
  customer: BookingData;
  adultPrice: number;
  childPrice: number;
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
