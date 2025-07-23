import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";

const departments = [
  "CSE", "ECE", "EEE", "Mech", "Civil", "Chemical", "MME", "Mining", "ARCH"
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    enrollment: "",
    department: "",
    passoutYear: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.endsWith("@students.vnit.ac.in")) {
      newErrors.email = "Use VNIT email only (must end with @students.vnit.ac.in)";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.enrollment.trim()) {
      newErrors.enrollment = "Enrollment number is required";
    }

    if (!form.department) {
      newErrors.department = "Please select a department";
    }

    const year = parseInt(form.passoutYear);
    if (!year || year > 2030 || year < 2020) {
      newErrors.passoutYear = "Passout year must be between 2020 and 2030";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await instance.post("/user/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          enrollmentNumber: form.enrollment,
          department: form.department,
          passOutYear: form.passoutYear
        });

        console.log("Registration successful:", res.data);
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error);
        alert(error?.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg w-full max-w-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">
            <ShinyText speed={2}>Create an Account</ShinyText>
          </h2>
          <p className="text-center text-sm text-gray-300 mb-4">
            Join the VNIT Project Repository ProLab
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border ${
                  errors.name ? "border-red-500" : "border-white/30"
                } rounded text-white placeholder:text-gray-300 focus:outline-none`}
                placeholder="Your full name"
                required
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">VNIT Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border ${
                  errors.email ? "border-red-500" : "border-white/30"
                } rounded text-white placeholder:text-gray-300 focus:outline-none`}
                placeholder="example@students.vnit.ac.in"
                required
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border ${
                  errors.password ? "border-red-500" : "border-white/30"
                } rounded text-white placeholder:text-gray-300 focus:outline-none`}
                placeholder="Minimum 6 characters"
                required
              />
              {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
            </div>

            {/* Enrollment */}
            <div>
              <label className="block text-sm font-medium mb-1">Enrollment Number</label>
              <input
                type="text"
                name="enrollment"
                value={form.enrollment}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border ${
                  errors.enrollment ? "border-red-500" : "border-white/30"
                } rounded text-white placeholder:text-gray-300 focus:outline-none`}
                placeholder="e.g. B21CS123"
                required
              />
              {errors.enrollment && (
                <p className="text-sm text-red-400 mt-1">{errors.enrollment}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border ${
                  errors.department ? "border-red-500" : "border-white/30"
                } rounded text-white focus:outline-none appearance-none`}
                required
              >
                <option value="" disabled className="bg-[#1c1c2c] text-white">
                  Select department
                </option>
                {departments.map((dept) => (
                  <option
                    key={dept}
                    value={dept}
                    className="bg-[#1c1c2c] text-white"
                  >
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-sm text-red-400 mt-1">{errors.department}</p>
              )}
            </div>

            {/* Passout Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Passout Year</label>
              <input
                type="number"
                name="passoutYear"
                value={form.passoutYear}
                onChange={handleChange}
                max={2030}
                className={`w-full p-2 bg-transparent border ${
                  errors.passoutYear ? "border-red-500" : "border-white/30"
                } rounded text-white placeholder:text-gray-300 focus:outline-none`}
                placeholder="e.g. 2026"
                required
              />
              {errors.passoutYear && (
                <p className="text-sm text-red-400 mt-1">{errors.passoutYear}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded hover:scale-[1.02] transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </DarkAuroraBackground>
  );
};

export default Register;
