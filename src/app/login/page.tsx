"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);

  const showToast = (
    message: string,
    type: "success" | "error",
    duration: number
  ) => {
    const color = type === "success" ? "#16a34a" : "#dc2626";
    const icon = type === "success" ? "✔️" : "❌";

    toast.custom(
      (t) => (
        <div
          className="relative bg-white shadow-lg rounded px-6 py-4 text-base font-medium flex items-center space-x-3"
          style={{ borderLeft: `4px solid ${color}`, minWidth: "300px" }}
        >
          <span style={{ fontSize: "1.2rem" }}>{icon}</span>
          <span style={{ color }}>{message}</span>
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              height: "4px",
              backgroundColor: color,
              width: "100%",
              transformOrigin: "right",
              animation: `progress-right-left ${duration}ms linear forwards`,
            }}
          ></span>
        </div>
      ),
      { duration }
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === "admin@gmail.com" && password === "1234") {
        showToast("Login Successful! Redirecting...", "success", 2000);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        showToast("Invalid Username or Password!", "error", 2500);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-gray-100">

      {/* Background for Desktop */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 -z-10"></div>

      {/* Background for Mobile */}
      <div className="md:hidden absolute inset-0">
        <img
          src="/buildingimg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden relative z-10">

        {/* Left Image */}
        <div className="hidden md:block md:w-1/2 h-[500px]">
          <img
            src="/buildingimg.png"
            alt="Login background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white/90 backdrop-blur-md">

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-900">SOCIETY-365</h2>
            <p className="text-gray-600 text-sm">Your Community. Managed.</p>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-900">
            Welcome Back 👋
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="peer w-full border border-gray-300 rounded-lg p-3 outline-none text-sm focus:border-blue-600"
              />
              <label
                htmlFor="username"
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-700 peer-valid:-top-2 peer-valid:text-xs bg-white/90 px-1"
              >
                Username or Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full border border-gray-300 rounded-lg p-3 outline-none text-sm focus:border-blue-600"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-700 peer-valid:-top-2 peer-valid:text-xs bg-white/90 px-1"
              >
                Password
              </label>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Remember me</span>
              </label>

              <a href="#" className="text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-900 shadow-md ${
                loading ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Sign Up */}
          <p className="text-center text-sm mt-4 text-gray-900">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </a>
          </p>

          {/* Powered By */}
          <div className="flex justify-end mt-2">
            <a
              href="https://nexspire.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-semibold italic hover:text-blue-600 transition-colors"
            >
              Powered by NexSpire Technologies
            </a>
          </div>
        </div>
      </div>

      {/* React Hot Toast */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Global keyframes for toast progress underline */}
      <style jsx global>{`
        @keyframes progress-right-left {
          from { width: 100%; }
          to { width: 0; }
        }
      `}</style>
    </div>
  );
}
