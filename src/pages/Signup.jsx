import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        signupAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Google signup failed.");
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

        <h2 className="text-2xl font-semibold text-white">
          Create Account
        </h2>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-800/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500/60 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-slate-800/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500/60 outline-none"
          />

          {error && (
            <div className="text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleSignup}
            className="w-full py-3 bg-red-600 hover:bg-red-500 rounded-xl text-white transition"
          >
            Create Account
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute w-full border-t border-white/10"></div>
            <span className="relative px-4 text-gray-400 text-sm bg-slate-900">
              or
            </span>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-medium hover:scale-[1.02] transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

        </div>

        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
