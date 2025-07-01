
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 bg-white/10 backdrop-blur-sm border-moviePurple/30"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-moviePurple hover:bg-moviePurple/80"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
