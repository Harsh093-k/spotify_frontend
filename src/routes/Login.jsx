import { Icon } from "@iconify/react";
import Testinput from "../components/shared/Testinput";
import Password from "../components/shared/Password";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHeplers";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();


    const login = async () => {
        const data = { email, password };

        const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

        if (response && !response.error) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);  // Token expiration date
            setCookie("token", token, { path: "/", expires: date });

            // Navigate to /home after successful login
            alert("Success");
            navigate("/home");

        } else {
            alert("Failure");
        }
    };


    return (
        <div className="w-full h-full flex flex-col items-center ">
            {/* Logo Section */}
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <Icon
                    icon="logos:spotify"
                    width="150"
                    aria-label="Spotify Logo"
                />
            </div>
            <div className="InputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                <div className="front-bold mb-6 "> To be continue,log in to  Spotify </div>
                <Testinput label="Email Address" Placeholder="enter the email" className="my-6" value={email} setvalue={setEmail} />
                <Password label="Password" Placeholder="enter password" value={password} setvalue={setPassword} />
                <div className=" flex items-center justify-end my-8 w-full  ">
                    <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" onClick={(e) => {
                        e.preventDefault();
                        login();
                    }}>LOG IN</button>
                </div>
                <div className="w-full border-b border-solid border-gray-300  "> </div>
                <div className="my-6 font-Semibold text-lg"> Don't have an account?</div>
                <div className="border border-gray-500 text-gray-500 font-bold w-full flex items-center justify-center py-3 rounded-full">
                    <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
