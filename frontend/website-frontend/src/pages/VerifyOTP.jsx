import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../api/authApi";

function VerifyOTP() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");

    const handleVerify = async () => {

        try {

            const userData = JSON.parse(
                localStorage.getItem(
                    "registerData"
                )
            );

            const response =
                await verifyOTP({

                    ...userData,

                    otp

                });

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "name",
                response.data.name
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            alert(
                "Registration Successful"
            );

            navigate("/");

        }

        catch (err) {

            alert(
                err.response.data.msg
            );

        }

    };

    return (

        <div className="min-h-screen bg-black flex justify-center items-center">

            <div className="bg-zinc-900 p-10 rounded-3xl w-[400px]">

                <h1 className="text-white text-4xl font-bold mb-8">

                    Verify OTP

                </h1>

                <input

                    placeholder="Enter OTP"

                    value={otp}

                    onChange={(e) =>
                        setOtp(
                            e.target.value
                        )
                    }

                    className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-6"

                />

                <button

                    onClick={handleVerify}

                    className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"

                >

                    Verify

                </button>

            </div>

        </div>

    );

}

export default VerifyOTP;