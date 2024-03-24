import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  // States
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  // Send Form
  const handleSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      // If logging in

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.info("Account Login");
          navigate("/home");
        })
        .catch(err => {
          if (err.code === "auth/invalid-credential") {
            toast.error(`Sorry, an error occurred: ${err.code}`);
            setError(true);
          }
        });
    } else {
      // If the account is being created
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.info("Your Account Has Been Created");
          navigate("/home");
        })
        .catch(err => {
          toast.error(err.code);
        });
    }
  };
  // Send Reset Mail
  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Password reset link sent ");
      })
      .catch(err => {
        toast.error(err.code);
      });
  };
  // Login with Google
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/home");
    });
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* X Logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="logo" />
        </div>

        <h1 className="text-center font-bold text-xl">Log in to Twitter</h1>

        {/* Google Button */}
        <button
          onClick={loginWithGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full text-black gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" />
          <span className="whitespace-nowrap">Sign in with Google</span>
        </button>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={e => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />

          <label className="mt-5">Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isLogin === true ? "Login" : "Register"}
          </button>
          {/* Forget Password */}
          {error === true && (
            <p
              className="text-center text-red-500 mt-5 cursor-pointer "
              onClick={sendMail}
            >
              Forgot your password?
            </p>
          )}

          <div className=" mt-4 w-[260px] h-[70px] ">
            <p className="mt-5 flex gap-3">
              <span className="text-gray-500">
                {" "}
                {isLogin === true ? "Need an Account?" : "Have an Account?"}
              </span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin === true ? "Create Account" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
