import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";
import axios from "axios";

const departments = [
  "CSE", "ECE", "EEE", "Mech", "Civil", "Chemical", "MME", "Mining", "ARCH"
];

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    enrollment: storedUser?.enrollmentNumber || "",
    department: storedUser?.department || "",
    passoutYear: storedUser?.passOutYear || "",
  });

  useEffect(() => {
    if (!userId) {
      alert("User not found. Please login again.");
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.put(`/user/update/${userId}`, {
        name: form.name,
        enrollmentNumber: form.enrollment,
        department: form.department,
        passOutYear: form.passoutYear,
      });

      if (res.data.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Update error:", err?.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg w-full max-w-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">
            <ShinyText speed={2}>Update Profile</ShinyText>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-white/30 rounded text-white placeholder:text-gray-300 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Enrollment Number</label>
              <input
                type="text"
                name="enrollment"
                value={form.enrollment}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-white/30 rounded text-white placeholder:text-gray-300 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-white/30 rounded text-white focus:outline-none appearance-none"
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Passout Year</label>
              <input
                type="number"
                name="passoutYear"
                value={form.passoutYear}
                onChange={handleChange}
                max={2035}
                className="w-full p-2 bg-transparent border border-white/30 rounded text-white placeholder:text-gray-300 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded hover:scale-[1.02] transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </DarkAuroraBackground>
  );
};

export default Profile;
