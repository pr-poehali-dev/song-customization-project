import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AudioPlayerProps {
  title: string;
  genre: string;
  duration: string;
  audioUrl?: string;
}

const AudioPlayer = ({ title, genre, duration, audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="bg-card border-gold/20 hover:border-gold transition-all duration-300 group">
      <CardContent className="pt-6">
        <div className="aspect-square bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg mb-4 flex items-center justify-center group-hover:from-gold/30 group-hover:to-gold/10 transition-all relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gold/80 hover:bg-gold text-background"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} className="w-8 h-8" />
            </Button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={totalDuration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
            />
            <span className="text-xs text-muted-foreground">{formatTime(totalDuration)}</span>
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{genre}</span>
            <span>{duration}</span>
          </div>
        </div>

        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
