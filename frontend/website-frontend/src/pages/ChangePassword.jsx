import { useState } from "react";

import Navbar from "../components/Navbar";

import { changePassword } from "../api/authApi";

import { toast } from "react-toastify";



function ChangePassword() {


const [oldPassword, setOldPassword] =
    useState("");

const [newPassword, setNewPassword] =
    useState("");

const handleChangePassword = async () => {

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        await changePassword(

            {
                oldPassword,
                newPassword
            },

            token

        );

        toast.success("Password Changed Successfully 🎉");

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

                    Change Password

                </h1>

                <input

                    type="password"

                    placeholder="Old Password"

                    value={oldPassword}

                    onChange={(e) =>
                        setOldPassword(
                            e.target.value
                        )
                    }

                    className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-5"

                />

                <input

                    type="password"

                    placeholder="New Password"

                    value={newPassword}

                    onChange={(e) =>
                        setNewPassword(
                            e.target.value
                        )
                    }

                    className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-8"

                />

                <button

                    onClick={handleChangePassword}

                    className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"

                >

                    Change Password

                </button>

            </div>

        </div>

    </div>

);


}

export default ChangePassword;
