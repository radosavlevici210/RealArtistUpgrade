import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { AiArtist } from "@shared/schema";

interface ArtistSelectionProps {
  selectedArtist: string;
  onArtistSelect: (artist: string) => void;
}

export function ArtistSelection({ selectedArtist, onArtistSelect }: ArtistSelectionProps) {
  const { data: artists = [], isLoading } = useQuery<AiArtist[]>({
    queryKey: ["/api/ai-artists"],
  });

  if (isLoading) {
    return (
      <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">AI Artist Selection</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-primary-700 rounded-xl animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-primary-600 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-primary-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">AI Artist Selection</h3>
      
      <div className="space-y-3">
        {artists.map((artist) => {
          const isSelected = selectedArtist === artist.name;
          
          return (
            <div
              key={artist.id}
              onClick={() => onArtistSelect(artist.name)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? "bg-accent-purple/10 border border-accent-purple/30"
                  : "bg-primary-700 hover:bg-primary-600 border border-primary-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={artist.avatarUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className={`font-medium ${isSelected ? "text-accent-purple" : "text-white"}`}>
                    {artist.name}
                  </h4>
                  <p className="text-xs text-gray-400">{artist.description}</p>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 bg-accent-purple rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}

        <Button
          variant="outline"
          className="w-full p-4 border-2 border-dashed border-primary-600 rounded-xl text-gray-400 hover:border-accent-blue hover:text-accent-blue transition-all bg-transparent"
        >
          <i className="fas fa-upload mr-2"></i>Upload Custom Voice
        </Button>
      </div>
    </div>
  );
}
