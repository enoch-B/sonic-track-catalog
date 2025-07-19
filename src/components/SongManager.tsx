import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Music2 } from "lucide-react";
import { SongCard, Song } from "./SongCard";
import { SongForm } from "./SongForm";
import { SongPagination } from "./SongPagination";
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const initialSongs: Song[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: 1975,
    genre: "Rock",
    duration: "5:55"
  },
  {
    id: "2",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    year: 1976,
    genre: "Rock",
    duration: "6:30"
  },
  {
    id: "3",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    genre: "Pop",
    duration: "4:54"
  },
  {
    id: "4",
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    year: 1971,
    genre: "Rock",
    duration: "3:07"
  },
  {
    id: "5",
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    year: 1965,
    genre: "Folk Rock",
    duration: "6:13"
  }
];

const SONGS_PER_PAGE = 4;

export const SongManager = () => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | undefined>();
  const { toast } = useToast();

  // Filter songs based on search term
  const filteredSongs = useMemo(() => {
    if (!searchTerm) return songs;
    
    return songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.genre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  // Paginate filtered songs
  const paginatedSongs = useMemo(() => {
    const startIndex = (currentPage - 1) * SONGS_PER_PAGE;
    const endIndex = startIndex + SONGS_PER_PAGE;
    return filteredSongs.slice(startIndex, endIndex);
  }, [filteredSongs, currentPage]);

  const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);

  // Reset to first page when search changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddSong = () => {
    setEditingSong(undefined);
    setShowForm(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setShowForm(true);
  };

  const handleDeleteSong = (id: string) => {
    const song = songs.find(s => s.id === id);
    setSongs(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Song deleted",
      description: `"${song?.title}" has been removed from your library.`,
    });
  };

  const handleFormSubmit = (songData: Omit<Song, 'id'> & { id?: string }) => {
    if (editingSong) {
      // Update existing song
      setSongs(prev => prev.map(song => 
        song.id === editingSong.id 
          ? { ...songData, id: editingSong.id } as Song
          : song
      ));
      toast({
        title: "Song updated",
        description: `"${songData.title}" has been updated successfully.`,
      });
    } else {
      // Add new song
      const newSong: Song = {
        ...songData,
        id: Date.now().toString()
      };
      setSongs(prev => [newSong, ...prev]);
      toast({
        title: "Song added",
        description: `"${songData.title}" has been added to your library.`,
      });
    }
    setShowForm(false);
    setEditingSong(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSong(undefined);
  };

  if (showForm) {
    return (
      <div className="container mx-auto p-6">
        <SongForm
          song={editingSong}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Music2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Song Manager
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your music library with ease. Add, edit, and organize your favorite songs.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search songs, artists, albums..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          onClick={handleAddSong}
          className="bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Song
        </Button>
      </div>

      {/* Songs Count */}
      <div className="text-sm text-muted-foreground">
        {searchTerm ? (
          <>Showing {filteredSongs.length} of {songs.length} songs</>
        ) : (
          <>{songs.length} songs in your library</>
        )}
      </div>

      {/* Songs Grid */}
      {paginatedSongs.length > 0 ? (
        <div className="space-y-4">
          {paginatedSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onEdit={handleEditSong}
              onDelete={handleDeleteSong}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Music2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchTerm ? 'No songs found' : 'No songs yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Add your first song to get started'
            }
          </p>
          {!searchTerm && (
            <Button 
              onClick={handleAddSong}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Song
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <SongPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalSongs={filteredSongs.length}
          songsPerPage={SONGS_PER_PAGE}
        />
      )}
    </div>
  );
};