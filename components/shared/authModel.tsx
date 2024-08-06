"use client";
import { useModel } from "@/hooks/useModel";
import { useCallback } from "react";
import { CgClose } from "react-icons/cg";

const AuthModel = () => {
  const { isLogin, isOpen, close, toggle } = useModel();

  const onClose = useCallback(() => {
    close();
  }, [close]);

  const onToggle = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20 transition-all duration-1000">
          <div
            className={`bg-white w-[40rem] ${
              isLogin ? "h-[30rem]" : "h-[37rem]"
            } p-8 rounded-lg shadow-lg transition-transform duration-300 transform ${
              isOpen ? "translate-y-0" : "translate-y-8"
            } ease-in-out`}
          >
            <div className="relative flex flex-col items-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              >
                <CgClose className="w-6 h-6" />
              </button>
              <div className="flex flex-col text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  {isLogin ? "Login" : "Signup"}
                </h1>
                <p className="text-gray-600">
                  {isLogin ? "Login to your account" : "Create an account"}
                </p>
              </div>
              <form action="" className="flex flex-col gap-6 w-full">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
                  />
                )}
                <input
                  type="text"
                  placeholder="Username"
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
                />
                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
                  />
                )}
                {isLogin && (
                  <p className="text-right text-blue-500 underline cursor-pointer hover:text-blue-700 transition duration-300">
                    Forgot Password?
                  </p>
                )}
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  {isLogin ? "Login" : "Signup"}
                </button>
              </form>
              <p className="mt-8 text-center">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={onToggle}
                      className="text-green-500 underline hover:text-green-700 transition duration-300"
                    >
                      Signup
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={onToggle}
                      className="text-green-500 underline hover:text-green-700 transition duration-300"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModel;
