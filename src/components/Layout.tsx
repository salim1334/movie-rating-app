
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, Bookmark } from "lucide-react";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  searchTab: ReactNode;
  watchedTab: ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const Layout = ({ searchTab, watchedTab, activeTab, onTabChange }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-movieDark to-black">
      <header className="container py-6">
        <h1 className="text-3xl md:text-3xl font-bold text-center text-white mb-6">
          Movie<span className="text-moviePurple">Muse</span>
        </h1>
      </header>
      
      <main className="container pb-16">
        <Tabs 
          value={activeTab} 
          onValueChange={onTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="search" className="data-[state=active]:bg-moviePurple">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="watched" className="data-[state=active]:bg-moviePurple">
              <Bookmark className="h-4 w-4 mr-2" />
              My Watchlist
            </TabsTrigger>
          </TabsList>
          
          <TabsContent 
            value="search"
            className="animate-fade-in mt-0"
          >
            {searchTab}
          </TabsContent>
          
          <TabsContent 
            value="watched"
            className="animate-fade-in mt-0"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your Watched Movies</h2>
              {watchedTab}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-4 text-center text-movieNeutral text-sm">
        <p>Movie data provided by OMDb API</p>
      </footer>
    </div>
  );
};

export default Layout;
