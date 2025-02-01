import { Icon } from "@iconify/react";
import { useCookies}  from "react-cookie";
import Testinput from "../components/shared/Testinput";
import Password from "../components/shared/Password";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHeplers";

const SignComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const signup = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email field must match. Please check again.");
      return;
    }
    const data = { email, username, password, firstName, lastName };

    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
    if (response && !response.err) {
      console.log("hello", response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30)
      setCookies("token", token, { path: "/", expires: date });
      navigate("/home");
      alert("Success");
    } else {
      alert("failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Logo Section */}
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon
          icon="logos:spotify"
          width="150"
          aria-label="Spotify Logo"
        />
      </div>

      {/* Input Region */}
      <div className="InputRegion w-1/3 py-10 flex flex-col items-center">
        <div className="font-bold mb-6 text-2xl">
          Sign up for free to start listening.
        </div>

        <Testinput
          label="Email Address"
          placeholder="Enter your email"
          className="my-6"
          value={email}
          setvalue={setEmail}
        />
        <Testinput
          label="Confirm Email Address"
          placeholder="Enter your email again"
          className="mb-6"
          value={confirmEmail}
          setvalue={setConfirmEmail}
        />
        <Testinput
          label="User Name"
          placeholder="Enter username"
          className="my-6"
          value={username}
          setvalue={setUsername}
        />
        <Password
          label="Create Password"
          placeholder="Enter a strong password"
          value={password}
          setvalue={setPassword}
        />
        <div className="w-full flex justify-between items-center space-x-8">
          <Testinput
            label="First Name"
            placeholder="Enter first name"
            className="my-6"
            value={firstName}
            setvalue={setFirstName}
          />
          <Testinput
            label="Last Name"
            placeholder="Enter last name"
            className="my-6"
            value={lastName}
            setvalue={setLastName}
          />
        </div>

        {/* Signup Button */}
        <div className="flex items-center justify-center my-6 w-full">
          <button
            className="bg-green-400 font-semibold p-3 px-10 rounded-full hover:bg-green-500"
            onClick={(e) => {
              e.preventDefault();
              signup();
            }}
          >
            SIGN UP
          </button>
        </div>

        {/* Divider */}
        <div className="w-full border-b border-solid border-gray-300"></div>

        {/* Login Instead */}
        <div className="my-6 font-semibold text-lg">Already have an account?</div>
        <div className="border border-gray-500 text-gray-500 font-bold w-full flex items-center justify-center py-3 rounded-full hover:bg-gray-100">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
};

export default SignComponent;

