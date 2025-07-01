
import { useEffect, useState } from "react";
import { WatchedMovie } from "@/types/movie";
import { getWatchedMovies, removeFromWatched } from "@/services/watchedMoviesService";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookmarkX, Star } from "lucide-react";
import { toast } from "sonner";

interface WatchedMoviesListProps {
  onMovieSelect: (id: string) => void;
}

const WatchedMoviesList = ({ onMovieSelect }: WatchedMoviesListProps) => {
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>([]);

  useEffect(() => {
    const loadWatchedMovies = () => {
      const movies = getWatchedMovies();
      setWatchedMovies(movies);
    };
    
    loadWatchedMovies();
    
    // Create a storage event listener to update the list when it changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "watched-movies") {
        loadWatchedMovies();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // We also need a custom event for changes within the same window
    const handleCustomStorageChange = () => loadWatchedMovies();
    window.addEventListener("watchedMoviesChanged", handleCustomStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("watchedMoviesChanged", handleCustomStorageChange);
    };
  }, []);

  const handleRemoveMovie = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    removeFromWatched(id);
    
    // Update the local state
    setWatchedMovies(prev => prev.filter(movie => movie.imdbID !== id));
    
    // Notify change to other components in the same window
    window.dispatchEvent(new Event("watchedMoviesChanged"));
    
    toast.success(`Removed ${title} from your watched list`);
  };

  if (watchedMovies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No movies in your watched list yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Search for movies and add them to your watched list!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {watchedMovies.map((movie) => (
          <Card 
            key={movie.imdbID} 
            className="movie-card cursor-pointer border-moviePurple/10 hover:border-moviePurple/30"
            onClick={() => onMovieSelect(movie.imdbID)}
          >
            <CardContent className="p-3 flex gap-3">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Image"} 
                alt={`${movie.Title} poster`}
                className="w-16 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium line-clamp-1">{movie.Title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{movie.Year}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs ml-1">{movie.imdbRating}</span>
                  </div>
                  {movie.userRating && (
                    <div className="flex items-center">
                      <span className="text-xs bg-moviePurple/20 text-moviePurple px-2 py-0.5 rounded-full">
                        Your rating: {movie.userRating}/5
                      </span>
                    </div>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1 h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={(e) => handleRemoveMovie(e, movie.imdbID, movie.Title)}
                >
                  <BookmarkX className="h-3.5 w-3.5 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default WatchedMoviesList;
