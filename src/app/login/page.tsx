"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === "admin@gmail.com" && password === "1234") {
       toast({
  title: "Login Successful",
});


        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        toast({
          title: "Login Failed ❌",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-gray-100">

      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 -z-10"></div>

      {/* Mobile Background */}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="peer w-full border border-gray-300 rounded-lg p-3 outline-none text-sm focus:border-blue-600"
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-700 peer-valid:-top-2 peer-valid:text-xs bg-white/90 px-1">
                Username or Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer w-full border border-gray-300 rounded-lg p-3 outline-none text-sm focus:border-blue-600"
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-700 peer-valid:-top-2 peer-valid:text-xs bg-white/90 px-1">
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-800 text-white py-3 rounded-lg font-semibold transition-all hover:bg-blue-900 shadow-md ${
                loading ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </a>
          </p>

          <div className="flex justify-end mt-2">
            <a
              href="https://nexspire.vercel.app/"
              target="_blank"
              className="text-blue-400 font-semibold italic hover:text-blue-600"
            >
              Powered by NexSpire Technologies
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
