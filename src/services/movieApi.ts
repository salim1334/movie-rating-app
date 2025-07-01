
import { OmdbSearchResponse, MovieDetail } from "../types/movie";

const API_KEY = 'febbd1dd';
const API_URL = "https://www.omdbapi.com";

export async function searchMovies(query: string, page: number = 1): Promise<OmdbSearchResponse> {
  try {
    const response = await fetch(
      `${API_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching movies:", error);
    return {
      Search: [],
      totalResults: "0",
      Response: "False",
      Error: "Failed to fetch movies"
    };
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetail> {
  try {
    const response = await fetch(
      `${API_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}
