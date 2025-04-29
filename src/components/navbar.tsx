import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";

export default function NavBar() {
  const isAuthenticated = useAuth()?.isAuthenticated;
  const signout = useAuth()?.signout;

  return (
    <div>
      {isAuthenticated ? (
          <button className="navbar-logout" onClick={signout}>
            Sign Out
          </button>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
