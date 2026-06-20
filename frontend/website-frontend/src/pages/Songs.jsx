import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import { getAllSongs } from "../api/songApi";

function Songs() {
  const [songs, setSongs] = useState([]); // safe default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllSongs();
      const payload = response?.data ?? response;

      // Normalize to array safely:
      const list =
        Array.isArray(payload) ? payload :
        Array.isArray(payload?.songs) ? payload.songs :
        Array.isArray(payload?.data) ? payload.data :
        [];

      setSongs(list);
    } catch (err) {
      console.error("fetchSongs error:", err);
      setError(err?.response?.data?.msg || err?.message || "Failed to load songs");
      setSongs([]); // ensure songs is an array
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-32 px-10">
        <h1 className="text-white text-5xl font-bold mb-10">All Songs</h1>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : songs.length === 0 ? (
          <div className="text-gray-400">No songs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(songs) &&
              songs.map((song) => (
                <SongCard key={song._id ?? song.id ?? song.title} song={song} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Songs;