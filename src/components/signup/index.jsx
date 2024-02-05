import { Alert, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);

  function showPassword() {
    if (hidePassword) {
      setHidePassword(false);
    } else {
      setHidePassword(true);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <div className="w-[80%] mx-auto py-2">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div className="max-w-[1240px] mx-auto flex justify-center py-[2rem]">
        <div className="w-[40%]   bg-white p-10 rounded-xl">
          <p className="text-3xl font-semibold flex justify-center text-gray-800">
            Create your account
          </p>
          <p className="flex justify-center my-[1rem] text-gray-800">
            Already have an account?
            <span className="ml-[5px] text-blue-800 underline">
              <a href="/login">Log In</a>
            </span>
          </p>

          <p className="text-gray-800 mb-[0.5rem] mt-[1rem]">Email address</p>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <div className="flex justify-between">
            <p className="text-gray-800 mb-[0.5rem] mt-[1rem]">Password</p>
            <button
              className="text-gray-800 mb-[0.5rem] mt-[1rem]"
              onClick={showPassword}
            >
              {hidePassword ? (
                <EyeIcon className="w-[20px]" />
              ) : (
                <EyeSlashIcon className="w-[20px]" />
              )}
            </button>
          </div>
          <Input
            type={hidePassword ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <button
            className="mt-[2rem] bg-blue-700 w-[100%] p-3 text-white text-l"
            onClick={handleSubmit}
          >
            Sign up with Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
