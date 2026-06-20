import { useEffect, useState } from "react";
import SongCard from "./SongCard";
import { getTrendingSongs } from "../api/songApi";

const TrendingSongs = () => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {

        fetchSongs();

    }, []);

    const fetchSongs = async () => {

        try {

            const response = await getTrendingSongs();

            const payload = response?.data ?? response;

            const list =
                Array.isArray(payload) ? payload :
                Array.isArray(payload?.songs) ? payload.songs :
                Array.isArray(payload?.data) ? payload.data :
                [];

            setSongs(list);

        }

        catch (err) {

            console.log(err);

            setSongs([]);

        }

    };

    return (

        <section className="bg-black text-white py-20">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-bold mb-12">

                    Trending Songs 🔥

                </h1>

                <div className="grid md:grid-cols-3 gap-10">

                    {

                        songs.map(

                            (song) => (

                                <SongCard

                                    key={song._id}

                                    song={song}

                                />

                            )

                        )

                    }

                </div>

            </div>

        </section>

    );

};

export default TrendingSongs;