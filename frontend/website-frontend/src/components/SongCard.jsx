import { useNavigate } from "react-router-dom";

function SongCard({ song }) {
  const navigate = useNavigate();
  const idKey = song._id ?? song.id ?? song.key ?? song.title;

  return (
    <div
      onClick={() => navigate(`/song/${song._id ?? song.id}`)}
      className="bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:scale-105 duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/song/${song._id ?? song.id}`);
      }}
    >
      <img src={song.thumbnail} alt={song.title} className="w-full h-64 object-cover" />
      <div className="p-5">
        <h1 className="text-white text-2xl font-bold">{song.title}</h1>
        <p className="text-gray-400 mt-2">{song.artist}</p>
      </div>
    </div>
  );
}

export default SongCard;