import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Music } from "lucide-react";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre?: string;
  duration?: string;
}

interface SongCardProps {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

export const SongCard = ({ song, onEdit, onDelete }: SongCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-secondary/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {song.title}
              </h3>
              <p className="text-muted-foreground font-medium">
                {song.artist}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>{song.album}</span>
                <span>•</span>
                <span>{song.year}</span>
                {song.genre && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                      {song.genre}
                    </span>
                  </>
                )}
                {song.duration && (
                  <>
                    <span>•</span>
                    <span>{song.duration}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(song)}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(song.id)}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};