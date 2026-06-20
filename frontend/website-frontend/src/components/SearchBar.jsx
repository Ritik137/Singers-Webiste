import { useState } from "react";
import { searchSongs } from "../api/songApi";
import SongCard from "./SongCard";

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([]);

    const handleSearch = async (e) => {

        const value = e.target.value;

        setQuery(value);

        if (!value.trim()) {

            setSongs([]);
            return;

        }

        try {

            const response = await searchSongs(value);

            setSongs(
                response.data.songs || []
            );

        }

        catch (err) {

            console.log(err);
            setSongs([]);

        }

    };

    return (

        <div className="bg-black py-10">

            <div className="max-w-7xl mx-auto px-8">

                <input

                    type="text"

                    placeholder="Search Songs..."

                    value={query}

                    onChange={handleSearch}

                    className="
                w-full
                p-4
                rounded-2xl
                bg-zinc-900
                text-white
                border
                border-zinc-700
                outline-none
                "

                />

                {

                    songs.length > 0 &&

                    <div className="
                grid
                md:grid-cols-3
                gap-8
                mt-10
                ">

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

                }

            </div>

        </div>

    );
};

export default SearchBar;