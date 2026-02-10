import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You've been logged out.");
      //  Redirect to home
      window.location.href = "/";
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Log Out
    </button>
  );
}

export default Logout;
