/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import ForgotPasswordForm from "./ForgotPassword";
import CustomeToast from "@/components/custome/CustomeToast";
import logo from "@/assets/man.jpg";
import { motion } from "framer-motion";
const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="w-[900px] h-[520px] shadow-lg shadow-white/30 flex rounded-2xl border border-white/30 shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-1/2 bg-black flex flex-col items-center justify-center">
          <img src={logo} alt="Cryptex" className="w-[99.5%] h-full" />
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-sm tracking-wide text-blue-400"
          >
            Where Crypto Meets Confidence.
          </motion.p> */}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 bg-white px-10 py-12 flex flex-col justify-center">
          <CustomeToast show={auth?.error} message={auth?.error?.error} />

          {/* HEADING */}
          <div className="mb-6 text-center">
            {/* <p className="text-sm uppercase tracking-widest text-gray-500">
              Sign In
            </p> */}

            <h1 className="text-4xl font-extrabold tracking-wide">
              <span className=" bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                CRYPTEX
              </span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                className="mt-2 text-sm  text-blue-400"
              >
                Where Crypto Meets Confidence.
              </motion.p>
            </h1>
          </div>

          {/* FORMS */}
          {location.pathname === "/signup" ? (
            <SignupForm />
          ) : location.pathname === "/forgot-password" ? (
            <ForgotPasswordForm />
          ) : (
            <LoginForm />
          )}

          {/* FORGOT PASSWORD */}
          {location.pathname === "/signin" && (
            <div className="mt-2 text-right"></div>
          )}

          {/* SWITCH AUTH */}
          {location.pathname !== "/forgot-password" && (
            <div className="mt-6 text-sm text-center text-gray-700">
              {location.pathname === "/signup" ? (
                <>
                  Already have an account?
                  <span
                    onClick={() => navigate("/signin")}
                    className="ml-1 font-semibold text-blue-500 cursor-pointer hover:underline"
                  >
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?
                  <span
                    onClick={() => navigate("/signup")}
                    className="ml-1 font-semibold text-blue-500 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
