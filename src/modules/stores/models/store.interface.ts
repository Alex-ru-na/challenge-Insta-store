
export interface Store {
  _id: string;
  store_id: string;
  store_name: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
  opening_hours: {
    monday: {
      open: string;
      close: string;
    };
    tuesday: {
      open: string;
      close: string;
    };
    wednesday: {
      open: string;
      close: string;
    };
    thursday: {
      open: string;
      close: string;
    };
    friday: {
      open: string;
      close: string;
    };
    saturday: {
      open: string;
      close: string;
    };
    sunday: {
      open: string;
      close: string;
    };
  };
  delivery_time: string[],
}

export interface ResponseClosestStore {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  coordinates: [number, number];
  nextDeliveryTime: string;
}

export interface RequestClosestStore {
  timezone: string;
  coordinates: [number, number];
}

export interface StoreAggregate extends Store {
  dist: {
    calculated: number
  },
  isOpenNow: boolean
}