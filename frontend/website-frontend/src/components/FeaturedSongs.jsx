import { useCallback, useEffect, useState } from "react";
import SongCard from "./SongCard";
import { getAllSongs } from "../api/songApi";

const FeaturedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllSongs();
      const payload = response?.data ?? response;

      const list =
        Array.isArray(payload) ? payload :
        Array.isArray(payload?.songs) ? payload.songs :
        Array.isArray(payload?.data) ? payload.data :
        [];

      setSongs(list);
    } catch (err) {
      console.error("fetchFeaturedSongs error:", err);
      setError(err?.response?.data?.msg || err?.message || "Failed to load songs");
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Latest Songs</h1>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : songs.length === 0 ? (
          <div className="text-gray-400">No songs found.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {Array.isArray(songs) &&
              songs.map((song) => <SongCard key={song._id ?? song.id ?? song.title} song={song} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSongs;