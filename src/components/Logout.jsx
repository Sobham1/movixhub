import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full text-left
        text-gray-300
        hover:text-white
        transition
      "
    >
      Log Out
    </button>
  );
}

export default Logout;
