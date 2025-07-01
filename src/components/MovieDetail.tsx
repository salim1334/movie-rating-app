
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MovieDetail as MovieDetailType } from "@/types/movie";
import { getMovieDetails } from "@/services/movieApi";
import { addToWatched, removeFromWatched, isMovieWatched, updateWatchedMovieRating } from "@/services/watchedMoviesService";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

interface MovieDetailProps {
  movieId: string;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetail = ({ movieId, isOpen, onClose }: MovieDetailProps) => {
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) return;
      
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setIsWatched(isMovieWatched(movieId));
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && movieId) {
      fetchMovieDetail();
    }
  }, [movieId, isOpen]);

  const handleToggleWatched = () => {
    if (!movie) return;
    
    if (isWatched) {
      removeFromWatched(movie.imdbID);
      toast.success(`Removed ${movie.Title} from your watched list`);
    } else {
      addToWatched({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        imdbRating: movie.imdbRating,
        runtime: movie.Runtime,
        userRating: userRating || undefined
      });
      toast.success(`Added ${movie.Title} to your watched list`);
    }
    
    setIsWatched(!isWatched);
  };

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    if (isWatched && movie) {
      updateWatchedMovieRating(movie.imdbID, rating);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moviePurple"></div>
          </div>
        ) : movie ? (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="w-1/3">
                  <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Image"} 
                    alt={`${movie.Title} poster`}
                    className="w-full rounded-md shadow-md"
                  />
                </div>
                <div className="w-2/3">
                  <DialogTitle className="text-2xl font-bold mb-1">{movie.Title}</DialogTitle>
                  <DialogDescription className="mb-2">
                    {movie.Year} • {movie.Runtime} • {movie.Rated}
                  </DialogDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {movie.Genre.split(", ").map((genre) => (
                      <Badge key={genre} variant="outline" className="bg-moviePurple/10 text-moviePurple border-moviePurple/30">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-1 fill-yellow-400" />
                      <span className="font-semibold">{movie.imdbRating}</span>
                      <span className="text-xs text-muted-foreground ml-1">/ 10</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleToggleWatched}
                      className="flex items-center gap-1 border-moviePurple/30 text-moviePurple hover:text-white hover:bg-moviePurple"
                    >
                      {isWatched ? (
                        <>
                          <BookmarkCheck className="h-4 w-4" />
                          Watched
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4" />
                          Add to Watched
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {isWatched && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Your Rating:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={`h-5 w-5 ${userRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Plot</h3>
                <p className="text-sm text-muted-foreground">{movie.Plot}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="font-medium block">Director</span>
                  <span className="text-muted-foreground">{movie.Director}</span>
                </div>
                <div>
                  <span className="font-medium block">Writers</span>
                  <span className="text-muted-foreground">{movie.Writer}</span>
                </div>
                <div>
                  <span className="font-medium block">Stars</span>
                  <span className="text-muted-foreground">{movie.Actors}</span>
                </div>
                <div>
                  <span className="font-medium block">Awards</span>
                  <span className="text-muted-foreground">{movie.Awards}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p>Failed to load movie details</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetail;
