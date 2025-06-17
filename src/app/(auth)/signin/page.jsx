"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decodeToken } from "@/lib/utils/decodeToken";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token;

        if (!token) {
          toast.error("No token received from server.");
          setLoading(false);
          return;
        }

        // Save token
        localStorage.setItem("token", token);
        login(token); // Auth context

        toast.success("Login successful!", { position: "top-right" });

        const decoded = decodeToken(token);

        if (!decoded || !decoded.role) {
          console.error("Invalid token or role missing.");
          toast.error("Invalid or missing role.");
          setLoading(false);
          return;
        }

        console.log("Token:", token);
        console.log("Decoded:", decoded);

        // Role-based redirect
        if (decoded.role === "doctor") {
          router.push("/doctor");
        } else if (decoded.role === "admin") {
          router.push("/admin-panel");
        } else if (decoded.role === "patient") {
          router.push("/patient");
        } else {
          router.push("/admin");
        }
      } else {
        toast.error(data.error || "Login failed!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>

        <div className="mb-6">
          <Label htmlFor="email" className="mb-2">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">
              <FormMessage>{errors.email?.message}</FormMessage>
            </div>
          )}
        </div>
        {/* Password  */}
        <div className="mb-6">
          <Label htmlFor="password" className="mb-2">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5 text-gray-500" />
              ) : (
                <FaEye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">
              <FormMessage>{errors.password?.message}</FormMessage>
            </div>
          )}
          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#022dbb] hover:bg-[#011f99] cursor-pointer dark:text-gray-300 dark:hover:text-gray-950"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="mt-6 text-sm text-center cursor-pointer">
          New to <span className="font-bold">Medisphere</span>? Click here to
          <Link className="text-[#022dbb] font-bold ml-1" href={"/signup/doctor"}>
            Join as a doctor 
          </Link> 
            Or
          <Link className="text-[#022dbb] font-bold ml-1" href={"/signup/patient"}>
            Register as a patient 
          </Link> 
          Or
          <Link className="text-[#022dbb] font-bold ml-1" href={"/signup/staff"}>
            Register as a Staff 
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default LoginForm;