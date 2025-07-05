import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('GOOGLE_MAPS_API_KEY is not defined in environment variables');
}

export interface DistanceMatrixResult {
  distance: string;
  duration: string;
  distanceValue: number; // em metros
  durationValue: number; // em segundos
}

export interface RouteCalculationResult {
  totalDistance: string;
  totalDuration: string;
  totalDistanceValue: number;
  totalDurationValue: number;
  segments: DistanceMatrixResult[];
}

interface GoogleMapsResponse {
  status: string;
  rows: Array<{
    elements: Array<{
      distance: { text: string; value: number };
      duration: { text: string; value: number };
    }>;
  }>;
}

export const googleMapsService = {
  async calculateDistanceMatrix(
    origins: string,
    destinations: string
  ): Promise<DistanceMatrixResult[]> {
    try {
      const response = await axios.get<GoogleMapsResponse>(
        `https://maps.googleapis.com/maps/api/distancematrix/json`,
        {
          params: {
            origins,
            destinations,
            key: GOOGLE_MAPS_API_KEY,
            units: 'metric',
            mode: 'driving'
          }
        }
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Google Maps API error: ${response.data.status}`);
      }

      return response.data.rows[0].elements.map((element) => ({
        distance: element.distance.text,
        duration: element.duration.text,
        distanceValue: element.distance.value,
        durationValue: element.duration.value
      }));
    } catch (error) {
      console.error('Error calling Google Maps API:', error);
      throw new Error('Failed to calculate distance and time');
    }
  },

  async calculateRouteDistance(
    destinations: Array<{ latitude: number; longitude: number }>
  ): Promise<RouteCalculationResult> {
    if (destinations.length < 2) {
      throw new Error('At least 2 destinations are required');
    }

    const segments: DistanceMatrixResult[] = [];
    let totalDistanceValue = 0;
    let totalDurationValue = 0;


    for (let i = 0; i < destinations.length - 1; i++) {
      const origin = `${destinations[i].latitude},${destinations[i].longitude}`;
      const destination = `${destinations[i + 1].latitude},${destinations[i + 1].longitude}`;

      const result = await this.calculateDistanceMatrix(origin, destination);
      segments.push(result[0]);

      totalDistanceValue += result[0].distanceValue;
      totalDurationValue += result[0].durationValue;
    }

    const totalDistance = this.formatDistance(totalDistanceValue);
    const totalDuration = this.formatDuration(totalDurationValue);

    return {
      totalDistance,
      totalDuration,
      totalDistanceValue,
      totalDurationValue,
      segments
    };
  },

  formatDistance(meters: number): string {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
  },

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}; 