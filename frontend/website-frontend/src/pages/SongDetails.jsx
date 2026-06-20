import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";

import { getSongById, likeSong, incrementViews } from "../api/songApi";

function SongDetails() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSong = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      // best-effort increment view (don't fail whole fetch if this errors)
      try {
        await incrementViews(id);
      } catch (e) {
        console.warn("incrementViews failed:", e);
      }

      const response = await getSongById(id);
      const payload = response?.data ?? response;
      const actualSong = payload?.song ?? payload; // backend either returns { song } or song directly
      setSong(actualSong ?? null);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || err?.message || "Failed to load song");
      setSong(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSong();
  }, [fetchSong]);

  const handleLike = async () => {
    if (!id) return;
    try {
        const token = localStorage.getItem("token");
      await likeSong(id, token);
      await fetchSong();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.msg || "Failed to like song");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 px-10 text-white text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 px-10 text-red-400 text-center">{error}</div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-32 px-10 text-gray-400 text-center">Song not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 px-6 md:px-10 pb-40">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <img
            src={song.thumbnail}
            alt={song.title || "Song thumbnail"}
            className="w-full max-w-sm md:w-[400px] h-[400px] object-cover rounded-3xl"
          />

          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">{song.title}</h1>

            <p className="text-gray-400 text-lg mt-4">{song.artist}</p>

            <div className="mt-4 text-gray-500">
              <p>
                <span className="font-medium text-gray-300">Album: </span>
                {song.album ?? "—"}
              </p>
              <p className="mt-2">
                <span className="font-medium text-gray-300">Views: </span>
                {song.views ?? 0}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleLike}
                className="mt-2 bg-red-500 px-6 py-3 rounded-2xl text-white inline-flex items-center gap-2"
                aria-label="Like song"
              >
                <span>❤️</span>
                <span>{song.likes ?? 0}</span>
              </button>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl md:text-3xl text-white font-bold">Lyrics</h2>
              <p className="text-gray-400 mt-4 whitespace-pre-wrap leading-7">{song.lyrics ?? "No lyrics available."}</p>
            </div>

            {song.audioUrl && (
              <div className="mt-8">
                <MusicPlayer song={song} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetails;