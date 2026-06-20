import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { updateProfile } from "../api/authApi";

function EditProfile() {


const navigate = useNavigate();

const [name, setName] =
    useState("");

const [phone, setPhone] =
    useState("");

const handleUpdate = async () => {

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        await updateProfile(

            {
                name,
                phone
            },

            token

        );

        alert(
            "Profile Updated Successfully"
        );

        navigate(
            "/profile"
        );

    }

    catch (err) {

        alert(

            err.response?.data?.msg ||

            "Something went wrong"

        );

    }

};

return (

    <div className="min-h-screen bg-black">

        <Navbar />

        <div className="flex justify-center pt-40">

            <div className="bg-zinc-900 p-10 rounded-3xl w-[500px]">

                <h1 className="text-white text-4xl font-bold mb-8">

                    Edit Profile

                </h1>

                <input

                    placeholder="Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }

                    className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-5"

                />

                <input

                    placeholder="Phone"

                    value={phone}

                    onChange={(e) =>
                        setPhone(
                            e.target.value
                        )
                    }

                    className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-8"

                />

                <button

                    onClick={handleUpdate}

                    className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"

                >

                    Update Profile

                </button>

            </div>

        </div>

    </div>

);


}

export default EditProfile;
