import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // db for Firestore
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

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
    </div>
  );
}

export default Signup;
