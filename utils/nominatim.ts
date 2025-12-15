// Base URL untuk Nominatim API
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export interface NominatimResult {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
  display_name: string;
  address?: any;
}

/**
 * Geocoding: Mengubah alamat menjadi koordinat
 * @param address - Alamat yang ingin dicari
 * @param options - Opsi tambahan untuk pencarian
 */
export const geocodeAddress = async (
  address: string,
  options: {
    limit?: number;
    countryCode?: string;
    addressDetails?: boolean;
  } = {}
): Promise<Coordinates | null> => {
  try {
    const { limit = 1, countryCode = "id", addressDetails = true } = options;

    const params = new URLSearchParams({
      q: address,
      format: "json",
      limit: limit.toString(),
      addressdetails: addressDetails ? "1" : "0",
      dedupe: "1",
      extratags: "1",
      namedetails: "1",
    });

    // Tambah countrycode
    if (countryCode) {
      params.append("countrycodes", countryCode);
    }

    // API request
    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: {
        "User-Agent": "CompanyMap/1.0 (contact@yourcompany.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimResult[] = await response.json();

    if (data.length === 0) {
      console.warn(`No results found for address: ${address}`);
      return null;
    }

    const result = data[0];

    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      display_name: result.display_name,
      address: result.address,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw new Error(`Failed to geocode address: ${address}`);
  }
};

/**
 * Reverse Geocoding: Mengubah koordinat menjadi alamat
 * @param lat - Latitude
 * @param lng - Longitude
 */
export const reverseGeocode = async (lat: number, lng: number): Promise<NominatimResult | null> => {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      format: "json",
      addressdetails: "1",
      extratags: "1",
      namedetails: "1",
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
      headers: {
        "User-Agent": "CompanyMap/1.0 (contact@yourcompany.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimResult = await response.json();
    return data;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    throw new Error(`Failed to reverse geocode coordinates: ${lat}, ${lng}`);
  }
};

/**
 * Mencari koordinat untuk beberapa alamat
 * @param addresses - Array of addresses to search
 */
export const geocodeMultipleAddresses = async (addresses: string[]): Promise<(Coordinates | null)[]> => {
  const results = await Promise.allSettled(addresses.map((address) => geocodeAddress(address)));

  return results.map((result) => (result.status === "fulfilled" ? result.value : null));
};

/**
 * Validasi koordinat
 * @param lat - Latitude
 * @param lng - Longitude
 */
export const validateCoordinates = (lat: number, lng: number): boolean => {
  return typeof lat === "number" && typeof lng === "number" && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !isNaN(lat) && !isNaN(lng);
};

/**
 * kalkulasi jarak optimal dengan menggunakan rumusan Haversine formula
 * @param lat1 - Latitude of first point
 * @param lng1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lng2 - Longitude of second point
 * @returns Distance dengan Kilometer
 */
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100;
};

/**
 * Format alamat untuk display
 * @param result - Nominatim result
 */
export const formatAddress = (result: NominatimResult): string => {
  const addr = result.address;
  if (!addr) return result.display_name;

  const parts = [addr.house_number, addr.road, addr.suburb, addr.city, addr.state].filter(Boolean);

  return parts.join(", ");
};

// Pembantu Rate-Limiter
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;

/**
 * Rate-limiter request wrapper
 * @param requestFn - Function that makes the request
 */
export const rateLimitedRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  lastRequestTime = Date.now();
  return requestFn();
};
