import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    navigate("/");
  } catch (err) {
    setError("Google login failed.");
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="
        w-full max-w-md
        bg-slate-900/50
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        shadow-2xl
        p-10
        space-y-6
      ">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Login to continue exploring MovixHub.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                bg-slate-800/70
                border border-white/10
                rounded-xl
                px-4 py-3
                text-white
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500/60
                transition
              "
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                bg-slate-800/70
                border border-white/10
                rounded-xl
                px-4 py-3
                text-white
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500/60
                transition
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-500
              text-white
              font-medium
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-400 hover:underline">
            Sign up
          </Link>
        </p>
          <div className="relative flex items-center justify-center my-6">
  <div className="absolute w-full border-t border-white/10"></div>
  <span className="relative px-4 text-gray-400 text-sm bg-slate-900">
    or
  </span>
</div>

<button
  type="button"
  onClick={handleGoogleLogin}
  className="
    w-full
    flex items-center justify-center gap-3
    py-3
    rounded-xl
    bg-white
    text-black
    font-medium
    transition
    hover:scale-[1.02]
  "
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>
      </div>
      

    </div>
  );
}

export default Login;
