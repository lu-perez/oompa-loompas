export interface OompaLoompa {
  id: number;
  first_name: string;
  last_name: string;
  favorite: {
    color: string;
    food: string;
    random_string: string;
    song: string;
  };
  gender: 'F' | 'M';
  image: string;
  profession: string;
  email: string;
  age: number;
  country: string;
  height: number;
}

export type FilteredOompaLoompa = Omit<OompaLoompa, 'favorite' | 'email' | 'age' | 'country' | 'height'>

export interface DetailedOompaLoompa extends FilteredOompaLoompa {
  description: string;
}

export type DetailedOompaLoompaWithoutId = Omit<DetailedOompaLoompa, 'id'>;

export interface OompaLoompasResponse {
  results: OompaLoompa[];
  current: number;
  total: number;
}

export interface OompaLoompasState {
  oompaLoompas: FilteredOompaLoompa[];
  detailedOompaLoompas: DetailedOompaLoompa[];
  activeDetailedOompaLoompa: DetailedOompaLoompa | null;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}
