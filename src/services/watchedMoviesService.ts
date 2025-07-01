
import { WatchedMovie } from "../types/movie";

const WATCHED_STORAGE_KEY = "watched-movies";

export function getWatchedMovies(): WatchedMovie[] {
  const storedData = localStorage.getItem(WATCHED_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

export function addToWatched(movie: WatchedMovie): void {
  const watchedMovies = getWatchedMovies();
  const updatedMovies = [...watchedMovies, movie];
  localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(updatedMovies));
}

export function removeFromWatched(id: string): void {
  const watchedMovies = getWatchedMovies();
  const updatedMovies = watchedMovies.filter(movie => movie.imdbID !== id);
  localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(updatedMovies));
}

export function isMovieWatched(id: string): boolean {
  const watchedMovies = getWatchedMovies();
  return watchedMovies.some(movie => movie.imdbID === id);
}

export function updateWatchedMovieRating(id: string, rating: number): void {
  const watchedMovies = getWatchedMovies();
  const updatedMovies = watchedMovies.map(movie => 
    movie.imdbID === id ? { ...movie, userRating: rating } : movie
  );
  localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(updatedMovies));
}
