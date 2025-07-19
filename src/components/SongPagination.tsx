import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SongPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalSongs: number;
  songsPerPage: number;
}

export const SongPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalSongs,
  songsPerPage
}: SongPaginationProps) => {
  const startSong = (currentPage - 1) * songsPerPage + 1;
  const endSong = Math.min(currentPage * songsPerPage, totalSongs);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
      <div className="text-sm text-muted-foreground">
        Showing {startSong}-{endSong} of {totalSongs} songs
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getVisiblePages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={
              page === currentPage
                ? "bg-gradient-primary hover:opacity-90"
                : "hover:bg-primary hover:text-primary-foreground"
            }
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};