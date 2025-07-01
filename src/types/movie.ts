
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}

export interface OmdbSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface OmdbDetailResponse {
  Response: string;
  Error?: string;
}

export interface WatchedMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
  runtime?: string;
  userRating?: number;
}
