import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../hooks/useAuth";
import img from "../assets/img/login-bg.webp";
import { Eye, EyeOff, Loader2, Github, } from "lucide-react";

const AuthLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  // SOCIAL LOGIN SIMULATION
  const handleSocialLogin = async (provider: "google" | "github") => {
    setError("");
    setLoading(true);
    try {
      // TODO: real social login function
      console.log(`${provider} login clicked`);
      // await signInWithGoogle() or signInWithGithub()
      navigate("/"); 
    } catch (err: any) {
      setError(err.message || `${provider} login xato bo‘ldi`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Iltimos, barcha maydonlarni to‘ldiring");
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

        {/* LEFT */}
        <div className="p-8 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            NiceDash
          </h1>

          <p className="text-slate-950 font-semibold text-2xl ">
            Welcome to NiceDash
          </p>
          <p className="text-gray-500 text-sm pb-4">
            Your admin Dashboard
          </p>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 p-2 border border-slate-800 hover:text-slate-50 text-slate-900 rounded-lg hover:bg-slate-500 transition cursor-pointer"
              disabled={loading}
            >
              Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 p-2 border border-slate-800 hover:text-slate-50 text-slate-900 rounded-lg hover:bg-slate-500 transition cursor-pointer"
              disabled={loading}
            >
              <Github size={18} />
              GitHub
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg font-bold">
            <Input
              label="Name"
              type="text"
              placeholder="Ismingizni kiriting..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Email kiriting..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative bg-white">
              <Input
                label="Password"
                type={show ? "text" : "password"}
                placeholder="Parol kiriting..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-black transition"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Yuklanmoqda..." : "Sign up"}
            </Button>
          </form>
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
