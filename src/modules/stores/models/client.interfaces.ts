export interface Client {
    _id: string;
    name: string;
    timezone: string;
    location: {
      iso3_country: string;
      city: string;
      state: string;
      coordinates: [number, number];
    };
  }