export interface Coordinates2D {
  latitude: number,
  longitude: number,
}

export interface OpeningHours {
  open: Date;
  close: Date;
}

export interface Store {
  _id: string;
  isOpen: boolean
  name: string;
  location: Coordinates2D;
  openingHours: OpeningHours;
}

export interface Client {
  _id: string;
  name: string;
  location: Coordinates2D;
}