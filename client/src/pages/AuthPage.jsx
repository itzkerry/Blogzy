import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Moon, Sun, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import useUserStore from "@/app/store/userStore"

export default function Component() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors, isSubmitting: isSubmittingSignup },
    reset: resetSignup,
    watch: watchSignup
  } = useForm();

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: signinErrors, isSubmitting: isSubmittingSignin },
    reset: resetSignin
  } = useForm();

  const { signin, signup } = useUserStore();
  const navigate = useNavigate();

  const onSubmitSignup = async (data) => {
    await signup(data, navigate);
  }

  const onSubmitSignin = async (data) => {
    await signin(data, navigate);
  }

  const { mode } = useParams();
  const [isSignUp, setIsSignUp] = useState(mode === 'signup')
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
      className={`min-h-screen transition-colors duration-300 ${isDarkMode
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
          className={`${isDarkMode
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
            className={`relative overflow-hidden py-0 ${isDarkMode
              ? "bg-slate-800/90 border-sky-700 shadow-2xl shadow-sky-900/20"
              : "bg-white/90 border-sky-200 shadow-2xl shadow-sky-500/10"
              } backdrop-blur-sm`}
          >
            {/* for laptop */}
            {!isMobile && <div className="hidden sm:grid grid-cols-2 min-h-[650px]">

              {/* Form Container */}
              <div className="relative overflow-hidden">
                {/* Sign Up Form */}
                {<div
                  className={`absolute inset-0 p-8 transition-transform duration-500 ease-in-out ${isSignUp ? "translate-x-0" : "translate-x-full"
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
                        <Label htmlFor="signup-username" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Username
                        </Label>
                        <div className="relative ">
                          <User
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("username",
                              {
                                required: "Username is required",
                                minLength: {
                                  value: 5,
                                  message: "Username must be at least 6 characters",
                                },
                                maxLength: {
                                  value: 20,
                                  message: "Uaername must not exceed 20 characters"
                                },
                                pattern: {
                                  value: /^(?!.*__)(?!_)[a-zA-Z0-9_]{5,20}(?<!_)$/,
                                  message:
                                    "Username must be 5–20 characters, no double underscores, and cannot start or end with _",
                                },
                              })}
                            id="signup-username"
                            type="text"
                            placeholder="Enter your username"
                            className={`pl-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.username && <p className="text-red-500 text-sm ">{signupErrors.username.message}</p>}
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
                            {...registerSignup("email",
                              {
                                required: "Email is required",
                                pattern: {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Please enter a valid email address (e.g., name@example.com)",
                                },
                              })}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`pl-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.email && <p className="text-red-500 text-sm">{signupErrors.email.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Password
                        </Label>
                        <div className="relative">
                          <Lock
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("password", {
                              required: "Password is required",
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                                message: "Password must be 8–16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
                              },
                            })}
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className={`pl-10 pr-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.password && <p className="text-red-500 text-sm">{signupErrors.password.message}</p>}

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-3 ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
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
                            className={`pl-10 pr-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.confirmPassword && (
                            <p className="text-red-500 text-sm">{signupErrors.confirmPassword.message}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute right-3 top-3 ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
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
                </div>}

                {/* Sign Up Toggle */}
                <div
                  className={`relative inset-0 p-8 h-full transition-transform duration-500 ease-in-out
                    ${isSignUp ? "translate-x-full " : "translate-x-0 "
                    }
                    ${isDarkMode ? "bg-gradient-to-br from-sky-800 to-sky-900" : "bg-gradient-to-br from-sky-400 to-sky-600"
                    }`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col justify-center items-center h-full p-8 text-center">

                    <div
                      className={`transition-all duration-500 ease-in-out ${!isSignUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                {<div
                  className={`absolute inset-0 p-8 transition-transform duration-500 ease-in-out ${isSignUp ? "-translate-x-full" : "translate-x-0 "
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
                            id="signin-email"
                            type="text"
                            placeholder="Enter your email or username"
                            className={`pl-10 ${isDarkMode
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
                            {...registerSignin("password", { required: "Password is required" })}
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`pl-10 pr-10 ${isDarkMode
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
                            className={`absolute right-3 top-3 ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
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
                            className={`rounded border-2 ${isDarkMode
                              ? "border-sky-600 text-sky-500 focus:ring-sky-500"
                              : "border-sky-300 text-sky-500 focus:ring-sky-500"
                              }`}
                          />
                          <span className={`text-sm ${isDarkMode ? "text-sky-300" : "text-sky-600"}`}>Remember me</span>
                        </label>
                        <button
                          type="button"
                          className={`text-sm ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
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
                </div>}

                { /*toggle Sign IN */}
                <div
                  className={`relative inset-0 p-8 h-full transition-transform duration-500 ease-in-out ${isSignUp ? "translate-x-0  " : "-translate-x-full"
                    }
                    ${isDarkMode ? "bg-gradient-to-br from-sky-800 to-sky-900" : "bg-gradient-to-br from-sky-400 to-sky-600"
                    }`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col justify-center items-center h-full p-8 text-center">
                    <div
                      className={`transition-all duration-500 ease-in-out ${isSignUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
            </div>}

            {/* for mobiles */}
            {isMobile && <div className="sm:hidden min-h-[550px] ">
              <div className="flex">
                {/* Sign Up Form */}
                {<div
                  className={`relative inset-0 p-8 h-full transition-transform duration-500 ease-in-out ${isSignUp ? "translate-x-0" : "translate-x-full"
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
                        <Label htmlFor="signup-username-mobile" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Username
                        </Label>
                        <div className="relative ">
                          <User
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("username",
                              {
                                required: "Username is required",
                                minLength: {
                                  value: 5,
                                  message: "Username must be at least 6 characters",
                                },
                                maxLength: {
                                  value: 20,
                                  message: "Uaername must not exceed 20 characters"
                                },
                                pattern: {
                                  value: /^(?!.*__)(?!_)[a-zA-Z0-9_]{5,20}(?<!_)$/,
                                  message:
                                    "Username must be 5–20 characters, no double underscores, and cannot start or end with _",
                                },
                              })}
                            id="signup-username-mobile"
                            type="text"
                            placeholder="Enter your username"
                            className={`pl-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.username && <p className="text-red-500 text-sm">{signupErrors.username.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-mobile" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Email
                        </Label>
                        <div className="relative">
                          <Mail
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address (e.g., name@example.com)",
                              },
                            })}
                            id="email-mobile"
                            type="email"
                            placeholder="Enter your email"
                            className={`pl-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.email && <p className="text-red-500 text-sm">{signupErrors.email.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password-mobile" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Password
                        </Label>
                        <div className="relative">
                          <Lock
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignup("password", {
                              required: "Password is required",
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                                message: "Password must be 8–16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
                              },
                            })}
                            id="signup-password-mobile"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className={`pl-10 pr-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.password && <p className="text-red-500 text-sm">{signupErrors.password.message}</p>}

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-3 ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
                              }`}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password-mobile" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
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
                            id="confirm-password-mobile"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`pl-10 pr-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signupErrors.confirmPassword && (
                            <p className="text-red-500 text-sm">{signupErrors.confirmPassword.message}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute right-3 top-3 ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
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
                    <p className="text-gray-400 text-center">OR</p>
                    <Button
                      onClick={toggleMode}
                      className={`w-[50%] mx-auto ${isDarkMode
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "bg-sky-500 hover:bg-sky-600 text-white"
                        }`}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>}

                {/* Sign In Form */}
                {<div
                  className={`absolute inset-0 p-8 transition-transform duration-500 ease-in-out ${isSignUp ? "-translate-x-full" : "translate-x-0 "
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
                        <Label htmlFor="signin-email-mobile" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Email or Username
                        </Label>
                        <div className="relative">
                          <Mail
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignin("signin", { required: "Email or username is required" })}
                            id="signin-email-mobile"
                            type="text"
                            placeholder="Enter your email or username"
                            className={`pl-10 ${isDarkMode
                              ? "bg-slate-700 border-sky-600 text-sky-100 placeholder:text-sky-400 focus:border-sky-400"
                              : "bg-sky-50 border-sky-200 text-sky-900 placeholder:text-sky-500 focus:border-sky-400"
                              }`}
                          />
                          {signinErrors.signin && <p className="text-red-500 text-sm absolute">{signinErrors.signin.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signin-password-mobile" className={`${isDarkMode ? "text-sky-200" : "text-sky-700"}`}>
                          Password
                        </Label>
                        <div className="relative">
                          <Lock
                            className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? "text-sky-400" : "text-sky-500"}`}
                          />
                          <Input
                            {...registerSignin("password", { required: "Password is required" })}
                            id="signin-password-mobile"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`pl-10 pr-10 ${isDarkMode
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
                            className={`absolute right-3 top-3 ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600"
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
                            className={`rounded border-2 ${isDarkMode
                              ? "border-sky-600 text-sky-500 focus:ring-sky-500"
                              : "border-sky-300 text-sky-500 focus:ring-sky-500"
                              }`}
                          />
                          <span className={`text-sm ${isDarkMode ? "text-sky-300" : "text-sky-600"}`}>Remember me</span>
                        </label>
                        <button
                          type="button"
                          className={`text-sm ${isDarkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
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
                    <p className="text-gray-400 text-center">OR</p>
                    <Button
                      onClick={toggleMode}
                      className={`w-[50%] mx-auto ${isDarkMode
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "bg-sky-500 hover:bg-sky-600 text-white"
                        }`}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>}
              </div>
            </div>}
          </Card>
        </div>
      </div>
    </div>
  )
}
