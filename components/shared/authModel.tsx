"use client";
import { useModel } from "@/hooks/useModel";
import { useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
const loginSchema = z.object({
  username: z.string().min(5, "Username is required"),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

const isRegisterFormErrors = (
  errors: FieldErrors<LoginData | RegisterData>
): errors is FieldErrors<RegisterData> => "name" in errors;

const isLoginFormErrors = (
  errors: FieldErrors<LoginData | RegisterData>
): errors is FieldErrors<LoginData> => !("name" in errors);

const AuthModel = ({ currentUser }: { currentUser: string | undefined }) => {
  const { isLogin, isOpen, close, toggle } = useModel();
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData | RegisterData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    mode: "onSubmit",
  });

  const isRegisterData = (
    data: LoginData | RegisterData
  ): data is RegisterData => {
    return "name" in data;
  };
  const onClose = useCallback(() => {
    close();
  }, [close]);

  const onToggle = useCallback(() => {
    toggle();
    reset();
  }, [toggle, reset]);

  const onSubmit: SubmitHandler<LoginData | RegisterData> = async (data) => {
    if (isLogin) {
      try {
        isLoading(true);
        const res = await axios.post("/api/login", {
          username: data.username,
          password: data.password,
        });
        isLoading(false);
        router.refresh();
        if (res.status === 200) {
          toast.success(res?.data?.message || "Registration successful");
          close();
        }
      } catch (error) {
        toast.error("Login failed");
        isLoading(false);
      }
    } else {
      try {
        isLoading(true);
        const res = await axios.post("/api/register", {
          name: isRegisterData(data) ? data.name : "",
          username: data.username,
          password: data.password,
        });
        isLoading(false);
        router.refresh();
        if (res.status === 200) {
          toast.success(res?.data?.message || "Registration successful");
          toggle();
        }
      } catch (error) {
        toast.error("Registration failed");
        isLoading(false);
      }
    }
    reset();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20 transition-opacity duration-300">
          <div
            className={`bg-white w-full max-w-lg ${
              isLogin ? "h-[30rem]" : "h-[37rem]"
            } p-8 rounded-lg shadow-lg transition-transform duration-300 transform ${
              isOpen ? "scale-100" : "scale-90"
            }`}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="relative flex flex-col items-center w-full">
                <button
                  onClick={onClose}
                  className="absolute -top-1 -right-2 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full transition-colors duration-300"
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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6 w-full"
                >
                  {!isLogin && (
                    <div className="w-full">
                      <input
                        {...formRegister("name")}
                        type="text"
                        placeholder="Name"
                        className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300 ${
                          isRegisterFormErrors(errors) && errors.name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {isRegisterFormErrors(errors) && errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="w-full">
                    <input
                      {...formRegister("username")}
                      type="text"
                      placeholder="Username"
                      className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300 ${
                        isLoginFormErrors(errors) && errors.username
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {isLoginFormErrors(errors) && errors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      {...formRegister("password")}
                      type="password"
                      placeholder="Password"
                      className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300 ${
                        isLoginFormErrors(errors) && errors.password
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {isLoginFormErrors(errors) && errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {isLogin && (
                    <p className="text-right text-blue-500 underline cursor-pointer hover:text-blue-700 transition duration-300 mt-2">
                      <a href="/forgot-password">Forgot password?</a>
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModel;
