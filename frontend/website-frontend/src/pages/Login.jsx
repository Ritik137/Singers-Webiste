import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { login } from "../api/authApi";

function Login() {

const navigate = useNavigate();

const { saveUser } = useContext(
    AuthContext
);

const [identifier, setIdentifier] =
    useState("");

const [password, setPassword] =
    useState("");

const handleLogin = async () => {

    try {

        const response =
            await login({

                identifier,
                password

            });

        saveUser(

            {

                name:
                    response.data.name,

                role:
                    response.data.role

            },

            response.data.token

        );

        alert(
            "Login Successful"
        );

        navigate("/");

    }

    catch (err) {

        alert(

            err.response?.data?.msg ||

            "Login Failed"

        );

    }

};

return (

    <div className="min-h-screen bg-black flex justify-center items-center">

        <div className="bg-zinc-900 p-10 rounded-3xl w-[400px]">

            <h1 className="text-white text-4xl font-bold mb-8">

                Login

            </h1>

            <input

                type="text"

                placeholder="Email or Phone"

                value={identifier}

                onChange={(e) =>
                    setIdentifier(
                        e.target.value
                    )
                }

                className="w-full p-4 mb-5 rounded-xl bg-zinc-800 text-white"

            />

            <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }

                className="w-full p-4 mb-5 rounded-xl bg-zinc-800 text-white"

            />

            <button

                onClick={handleLogin}

                className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"

            >

                Login

            </button>

        </div>

    </div>

);

}

export default Login;
