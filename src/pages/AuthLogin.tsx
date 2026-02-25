import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../hooks/useAuth";
import img from "../assets/img/login-bg.webp";
import { Eye, EyeOff, Loader2, Github, Zap } from "lucide-react";

const AuthLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  // SOCIAL LOGIN PLACEHOLDER
  const handleSocialLogin = async (provider: "google" | "github") => {
    setError("");
    setLoading(true);
    try {
      console.log(`${provider} login clicked`);
      // TODO: replace with real social login
      navigate("/");
    } catch (err: any) {
      setError(err.message || `${provider} login xato bo‘ldi`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Iltimos, email va parolni kiriting");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Email yoki parol noto‘g‘ri");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="flex rounded-2xl shadow-xl border border-slate-200 overflow-hidden w-full max-w-4xl bg-white">

        {/* LEFT FORM */}
        <div className="p-8 w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            {/* Icon with border */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-slate-300 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>

            {/* Text */}
            <h1 className="text-2xl font-bold text-slate-800">Nexus</h1>
          </div>

          <p className="text-slate-950 font-semibold text-2xl mb-1">
            Welcome to Nexus
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Your admin Dashboard
          </p>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-800 hover:text-slate-50 text-slate-900 rounded-lg hover:bg-slate-500 transition"
              disabled={loading}
            >
              Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-800 hover:text-slate-50 text-slate-900 rounded-lg hover:bg-slate-500 transition"
              disabled={loading}
            >
              <Github size={18} />
              GitHub
            </button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-lg">
              Or Sign Up With
            </h1>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 px-3 rounded-lg">
              {error}
            </p>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Ismingizni kiriting..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              loading={loading}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Email kiriting..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              loading={loading}
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Parol kiriting..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
              loading={loading}
            />

            <Button
              type="submit"
              disabled={loading}
              className="py-2 px-3 w-full"
            >
              {loading && <Loader2 className="animate-spin mr-2" size={18} />}
              {loading ? "Yuklanmoqda..." : "Login"}
            </Button>
          </form>

          <p className="text-lg pt-2">
            Already have account?
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={img}
            alt="login"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
