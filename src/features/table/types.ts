export type DataViewTableProps = {
  selectedCoordinates: { latitude?: number; longitude?: number };
  date?: string;
  postcode: string;
  loadingCoordinates: boolean;
};

export type CrimeData = {
  category: string;
  context: string;
  id: number;
  location: {
    latitude: string;
    street: {
      id: number;
      name: string;
    };
  };
  location_subtype: string;
  location_type: string;
  month: string;
  outcome_status: {
    category: string;
    date: string;
  };
  persistent_id: string;
};
