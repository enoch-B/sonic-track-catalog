import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Song } from "./SongCard";

interface SongFormProps {
  song?: Song;
  onSubmit: (song: Omit<Song, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export const SongForm = ({ song, onSubmit, onCancel }: SongFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: new Date().getFullYear(),
    genre: '',
    duration: ''
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        year: song.year,
        genre: song.genre || '',
        duration: song.duration || ''
      });
    }
  }, [song]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ...(song && { id: song.id })
    });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">
          {song ? 'Edit Song' : 'Add New Song'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-foreground font-medium">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="mt-1"
                placeholder="Enter song title"
              />
            </div>
            <div>
              <Label htmlFor="artist" className="text-foreground font-medium">
                Artist *
              </Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => handleChange('artist', e.target.value)}
                required
                className="mt-1"
                placeholder="Enter artist name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="album" className="text-foreground font-medium">
                Album *
              </Label>
              <Input
                id="album"
                value={formData.album}
                onChange={(e) => handleChange('album', e.target.value)}
                required
                className="mt-1"
                placeholder="Enter album name"
              />
            </div>
            <div>
              <Label htmlFor="year" className="text-foreground font-medium">
                Year *
              </Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                required
                className="mt-1"
                min="1900"
                max={new Date().getFullYear() + 5}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="genre" className="text-foreground font-medium">
                Genre
              </Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="mt-1"
                placeholder="e.g., Pop, Rock, Jazz"
              />
            </div>
            <div>
              <Label htmlFor="duration" className="text-foreground font-medium">
                Duration
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="mt-1"
                placeholder="e.g., 3:45"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-gradient-primary hover:opacity-90"
            >
              {song ? 'Update Song' : 'Add Song'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};