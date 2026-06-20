import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../api/authApi";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async () => {

        try {

            await sendOTP(form);

            localStorage.setItem(
                "registerData",
                JSON.stringify(form)
            );

            alert("OTP Sent Successfully");

            navigate("/verify-otp");

        }

        catch (err) {

            console.log(err);

            console.log(err.response);

            console.log(err.response.data);

            alert(err.response.data.msg);

        }
    };

    return (

        <div className="min-h-screen bg-black flex justify-center items-center">

            <div className="bg-zinc-900 p-10 rounded-3xl w-[450px]">

                <h1 className="text-white text-4xl font-bold mb-8">

                    Register

                </h1>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    className="w-full p-4 mb-4 rounded-xl bg-zinc-800 text-white"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-4 mb-6 rounded-xl bg-zinc-800 text-white"
                />

                <button

                    onClick={handleSubmit}

                    className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"

                >

                    Send OTP

                </button>

            </div>

        </div>

    );

}

export default Register;