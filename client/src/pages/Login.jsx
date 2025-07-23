import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../utils/axios";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.endsWith("@students.vnit.ac.in")) {
      setEmailError("Please use your VNIT email address (@students.vnit.ac.in)");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !value.endsWith("@students.vnit.ac.in")) {
      setEmailError("Please use your VNIT email address (@students.vnit.ac.in)");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !password) return;

    try {
      const res = await instance.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.createToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg w-full max-w-lg p-8 text-white">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              📚
            </div>
            <h2 className="text-3xl font-bold mt-2">
              <ShinyText speed={2}>Welcome to VNIT Project Repository ProLab</ShinyText>
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Sign in to explore and share amazing projects
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">VNIT Email</label>
              <input
                type="email"
                placeholder="your.name@students.vnit.ac.in"
                value={email}
                onChange={handleEmailChange}
                required
                className={`w-full p-2 bg-transparent border ${
                  emailError ? "border-red-500" : "border-white/30"
                } rounded text-white placeholder:text-gray-300 focus:outline-none`}
              />
              {emailError && (
                <p className="text-sm text-red-400 mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 bg-transparent border border-white/30 rounded text-white placeholder:text-gray-300 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!!emailError || !email || !password}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded hover:scale-[1.02] transition duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm text-gray-300 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline font-medium">
              Register here
            </Link>
          </div>

          <p className="text-xs text-center text-gray-400 mt-4 border-t pt-4">
            Exclusive to VNIT students and alumni
          </p>
        </div>
      </div>
    </DarkAuroraBackground>
  );
};

export default Login;
