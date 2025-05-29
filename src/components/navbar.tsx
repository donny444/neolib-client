import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";

export default function NavBar() {
  const isAuthenticated = useAuth()?.isAuthenticated;
  const signout = useAuth()?.signout;

  return (
    <div className="navbar navbar-expand-lg navbar-primary bg-success mb-5 p-2">
      {isAuthenticated ? (
          <button className="d-flex justify-content-end gap-3 text-dark bg-light px-3 py-2 rounded-2" onClick={signout}>
            Sign Out
          </button>
      ) : (
        <div
          className="container d-flex justify-content-end gap-3"
          style={{ maxWidth: "720px" }}
        >
          <Link className="text-dark bg-light px-3 py-2 rounded-2"to="/signin">Sign In</Link>
          <Link className="text-dark bg-light px-3 py-2 rounded-2" to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
}
