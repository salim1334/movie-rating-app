
import { Movie } from "@/types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { isMovieWatched } from "@/services/watchedMoviesService";

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const [isWatched, setIsWatched] = useState(isMovieWatched(movie.imdbID));
  const { Title, Year, Poster, Type, imdbID } = movie;

  const defaultPoster = "https://placehold.co/300x450?text=No+Image";
  const posterSrc = Poster !== "N/A" ? Poster : defaultPoster;

  return (
    <Card 
      className="movie-card relative overflow-hidden cursor-pointer border-transparent"
      onClick={() => onClick(imdbID)}
    >
      <CardContent className="p-0 relative">
        <img 
          src={posterSrc} 
          alt={`${Title} poster`}
          className="movie-poster w-full h-full"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white font-medium truncate">{Title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white/80 text-sm">{Year}</span>
            <Badge 
              variant="outline" 
              className="bg-white/20 text-white border-none text-xs"
            >
              {Type}
            </Badge>
          </div>
        </div>
        {isWatched && (
          <div className="absolute top-2 right-2">
            <BookmarkCheck className="h-5 w-5 text-moviePurple drop-shadow-md" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
