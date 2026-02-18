import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // db for Firestore
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../firebase";

const handleGoogleSignup = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    navigate("/");
  } catch (err) {
    setError("Google signup failed.");
  }
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Optional: store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        signupAt: new Date().toISOString(),
      });

      alert("Account created!");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Create Account</button>
      <div className="relative flex items-center justify-center my-6">
  <div className="absolute w-full border-t border-white/10"></div>
  <span className="relative px-4 text-gray-400 text-sm bg-slate-900">
    or
  </span>
</div>

<button
  type="button"
  onClick={handleGoogleSignup}
  className="
    w-full
    flex items-center justify-center gap-3
    py-3
    rounded-xl
    bg-white
    text-black
    font-medium
    hover:scale-[1.02]
    transition
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
  );
}

export default Signup;
