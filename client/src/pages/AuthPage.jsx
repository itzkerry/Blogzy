import React from "react"
import {useForm} from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Moon, Sun, User, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function Component() {
 const {
  register: registerSignup,
  handleSubmit: handleSubmitSignup,
  formState: { errors: signupErrors,isSubmitting: isSubmittingSignup },
  reset: resetSignup,
  watch: watchSignup
} = useForm();

const {
  register: registerSignin,
  handleSubmit: handleSubmitSignin,
  formState: { errors: signinErrors,isSubmitting: isSubmittingSignin },
  reset: resetSignin
} = useForm();

  const onSubmitSignup = async (data) => {
    console.log("Signup data:", data);
    try{
      const res = await fetch("http://localhost:5000/api/auth/signup",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if(res.ok){
        alert("signup successful!");
        resetSignup();
        setIsSignUp(false);
      }else{
        alert(result.message || "Signup failed. Please try again.");
      }
    }catch(err){
      console.error("Error during signup:", err);
      alert("An error occurred. Please try again later.");
    }
  }
  const onSubmitSignin = async (data) => {
    console.log("Signin data:", data);
    try{
      const res = await fetch("http://localhost:5000/api/auth/signin",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if(res.ok){
        alert("signin successful!");
        resetSignin();
        setIsSignUp(false);
      }else{
        alert(result.message || "Signin failed. Please try again.");
      }
    }catch(err){
      console.error("Error during signin:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  const [isSignUp, setIsSignUp] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800"
          : "bg-gradient-to-br from-sky-50 via-sky-100 to-blue-50"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={`${
            isDarkMode
              ? "bg-slate-800 border-sky-600 text-sky-200 hover:bg-slate-700"
              : "bg-white border-sky-200 text-sky-600 hover:bg-sky-50"
          }`}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-4xl">
          <Card
            className={`relative overflow-hidden py-0 ${
              isDarkMode
                ? "bg-slate-800/90 border-sky-700 shadow-2xl shadow-sky-900/20"
                : "bg-white/90 border-sky-200 shadow-2xl shadow-sky-500/10"
            } backdrop-blur-sm`}
          >
            <div className="grid sm:grid-cols-2 min-h-[600px]">

              {/* Form Container */}
              <div className="relative overflow-hidden">
                {/* Sign Up Form */}
                <div
                  className={`absolute inset-0 p-8 transition-transform duration-500 ease-in-out ${
                    isSignUp ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="flex flex-col justify-center h-full max-w-sm mx-auto">
                    <div className="text-center mb-8">
                      <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-sky-100" : "text-sky-900"}`}>
                        Create Account
                      </h1>
                      <p className={`${isDarkMode ? "text-sky-300" : "text-sky-600"}`}>Join us today and get started</p>
                    </div>

                    <form
                      onSubmit={handleSubmitSignup(onSubmitSignup)}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="username" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Username
                        </Label>
                        <div className="relative ">
                          <User
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("username", { required: "Username is required" })}
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            className={`pl-10 ${
                              isDarkMode
                                ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                                : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                            }`}
                          />
                          {signupErrors.username && <p className="text-red-500 text-sm absolute">{signupErrors.username.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Email
                        </Label>
                        <div className="relative">
                          <Mail
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("email", { required: "Email is required" })}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`pl-10 ${
                              isDarkMode
                                ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                                : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                            }`}
                          />
                          {signupErrors.email && <p className="text-red-500 text-sm">{signupErrors.email.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Password
                        </Label>
                        <div className="relative">
                          <Lock
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("password", { required: "Password is required" })}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className={`pl-10 pr-10 ${
                              isDarkMode
                                ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                                : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                            }`}
                          />
                          {signupErrors.password && <p className="text-red-500 text-sm">{signupErrors.password.message}</p>}

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-3 ${
                              isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
                            }`}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("confirmPassword", {
                              required: "Please confirm your password",
                              validate: (value) => value === watchSignup("password") || "Passwords do not match"
                            })}
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`pl-10 pr-10 ${
                              isDarkMode
                                ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                                : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                            }`}
                          />
                          {signupErrors.confirmPassword && (
                            <p className="text-red-500 text-sm absolute">{signupErrors.confirmPassword.message}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute right-3 top-3 ${
                              isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
                            }`}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmittingSignup}
                        className={`w-full
                          ${isSubmittingSignup ? "opacity-50 cursor-not-allowed" : ""}
                           ${isDarkMode
                            ? "bg-sky-600 hover:bg-sky-700 text-white"
                            : "bg-sky-500 hover:bg-sky-600 text-white"
                        }`}
                      >
                        {isSubmittingSignup ? "Signing Up..." : "Create Account"}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Sign Up Toggle */}
                <div
                  className={`relative inset-0 p-8 h-full transition-transform duration-500 ease-in-out
                    ${
                      isSignUp ? "translate-x-full " : "translate-x-0 "
                    }
                    ${
                    isDarkMode ? "bg-gradient-to-br from-sky-800 to-sky-900" : "bg-gradient-to-br from-sky-400 to-sky-600"
                  }`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col justify-center items-center h-full p-8 text-center">

                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        !isSignUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      } ${isSignUp ? "absolute" : ""}`}
                    >
                      <h2 className="text-3xl font-bold text-white mb-4">New here?</h2>
                      <p className="text-sky-100 mb-8 text-lg">
                        Create an account and discover all the amazing features we have to offer.
                      </p>
                      <Button
                        onClick={toggleMode}
                        variant="outline"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-2 text-lg font-semibold"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden">
                {/* Sign In Form */}
                  <div
                    className={`absolute inset-0 p-8 transition-transform duration-500 ease-in-out ${
                      isSignUp ? "-translate-x-full" : "translate-x-0 "
                    }`}
                  >
                    <div className="flex flex-col justify-center h-full max-w-sm mx-auto">
                      <div className="text-center mb-8">
                        <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-sky-100" : "text-sky-900"}`}>
                          Welcome Back
                        </h1>
                        <p className={`${isDarkMode ? "text-sky-300" : "text-sky-600"}`}>Sign in to your account</p>
                      </div>

                      <form
                        className="space-y-4"
                        onSubmit={handleSubmitSignin(onSubmitSignin)}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="signin-email" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                            Email or Username
                          </Label>
                          <div className="relative">
                            <Mail
                              className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                            />
                            <Input
                              {...registerSignin("signin", { required: "Email or username is required" })}
                              id="signin"
                              type="text"
                              placeholder="Enter your email or username"
                              className={`pl-10 ${
                                isDarkMode
                                  ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                                  : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                            />
                            {signinErrors.signin && <p className="text-red-500 text-sm absolute">{signinErrors.signin.message}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                            Password
                          </Label>
                          <div className="relative">
                            <Lock
                              className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                            />
                            <Input
                              {...registerSignin("signinPassword", { required: "Password is required" })}
                              id="signin-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className={`pl-10 pr-10 ${
                                isDarkMode
                                  ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                                  : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                            />
                            {signinErrors.signinPassword && (
                              <p className="text-red-500 text-sm absolute">{signinErrors.signinPassword.message}</p>
                            )}
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className={`absolute right-3 top-3 ${
                                isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
                              }`}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className={`rounded border-2 ${
                                isDarkMode
                                  ? "border-sky-600 text-sky-500 focus:ring-sky-500"
                                  : "border-sky-300 text-sky-500 focus:ring-sky-500"
                              }`}
                            />
                            <span className={`text-sm ${isDarkMode ? "text-sky-300" : "text-sky-600"}`}>Remember me</span>
                          </label>
                          <button
                            type="button"
                            className={`text-sm ${
                              isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
                            } hover:underline`}
                          >
                            Forgot password?
                          </button>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmittingSignin}
                          className={`w-full 
                            ${isSubmittingSignin ? "opacity-50 cursor-not-allowed" : ""}
                            ${isDarkMode
                              ? "bg-sky-600 hover:bg-sky-700 text-white"
                              : "bg-sky-500 hover:bg-sky-600 text-white"
                          }`}
                        >
                          {isSubmittingSignin ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    </div>
                  </div>

                { /*toggle Sign IN */}
                <div
                  className={`relative inset-0 p-8 h-full transition-transform duration-500 ease-in-out ${
                      isSignUp ? "translate-x-0  " : "-translate-x-full"
                    }
                    ${
                    isDarkMode ? "bg-gradient-to-br from-sky-800 to-sky-900" : "bg-gradient-to-br from-sky-400 to-sky-600"
                  }`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col justify-center items-center h-full p-8 text-center">
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isSignUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      } ${!isSignUp ? "absolute" : ""}`}
                    >
                      <h2 className="text-3xl font-bold text-white mb-4">Already have an account?</h2>
                      <p className="text-sky-100 mb-8 text-lg">
                        Sign in to access your account and continue your journey with us.
                      </p>
                      <Button
                        onClick={toggleMode}
                        variant="outline"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-2 text-lg font-semibold"
                      >
                        Sign In
                      </Button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
