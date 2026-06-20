import { useEffect, useRef, useState } from "react";

function MusicPlayer({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [song?.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // when song changes, reset progress and pause
    setProgress(0);
    setDuration(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [song?.audioUrl]);

  const handlePlayPause = () => setIsPlaying((s) => !s);

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 px-6 py-3 flex items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-4">
        <img src={song.thumbnail} alt={song.title} className="w-14 h-14 rounded-md object-cover" />
        <div>
          <div className="text-white font-medium">{song.title}</div>
          <div className="text-sm text-gray-400">{song.artist}</div>
        </div>
      </div>

      <div className="flex-1 mx-4">
        <input
          type="range"
          min={0}
          max={Math.round(duration || 0)}
          value={Math.round(progress || 0)}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{new Date((progress || 0) * 1000).toISOString().substr(14, 5)}</span>
          <span>{new Date((duration || 0) * 1000).toISOString().substr(14, 5)}</span>
        </div>
      </div>

      <button
        onClick={handlePlayPause}
        className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <audio ref={audioRef} src={song.audioUrl} preload="metadata" />
    </div>
  );
}

export default MusicPlayer;