
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import { toast } from "sonner";

import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import MovieDetail from "@/components/MovieDetail";
import WatchedMoviesList from "@/components/WatchedMoviesList";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("search");
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length > 0,
    keepPreviousData: true,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleMovieClick = (id: string) => {
    setSelectedMovieId(id);
    setIsDetailModalOpen(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Combine current page results with previous pages
  const movies = data?.Search || [];
  const totalResults = data?.totalResults ? parseInt(data.totalResults, 10) : 0;
  const hasMoreResults = movies.length < totalResults;

  // Handle error display
  if (error) {
    toast.error("Failed to fetch movies. Please try again.");
  }

  const renderSearchResults = () => {
    if (isLoading && query) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-moviePurple"></div>
        </div>
      );
    }

    if (query && movies.length === 0 && !isLoading) {
      return (
        <div className="text-center py-12 text-white">
          <p className="text-xl">No movies found</p>
          <p className="text-muted-foreground mt-2">Try a different search term</p>
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center py-12 text-white">
          <p className="text-xl">Search for a movie to get started</p>
          <p className="text-movieNeutral mt-2">
            Type in the search bar above to find movies
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onClick={handleMovieClick} 
            />
          ))}
        </div>

        {hasMoreResults && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={isFetching}
              className="bg-moviePurple hover:bg-moviePurple/80"
            >
              {isFetching ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </>
    );
  };

  const searchTabContent = (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {query ? `Search results for "${query}"` : "Search Results"}
        </h2>
        {renderSearchResults()}
      </div>
    </div>
  );
  
  const watchedTabContent = (
    <WatchedMoviesList onMovieSelect={handleMovieClick} />
  );

  return (
    <>
      <Layout 
        searchTab={searchTabContent} 
        watchedTab={watchedTabContent} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
      
      <MovieDetail 
        movieId={selectedMovieId} 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
      />
    </>
  );
};

export default Index;
