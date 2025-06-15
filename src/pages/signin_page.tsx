import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/auth_context';

export default function SignInPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent, usernameOrEmail: string, password: string) => {
    e.preventDefault();
    const response = await handleSignIn(usernameOrEmail, password);
    if (response?.status === 200) {
        const { username, token, message } = response?.data;
        console.log(message);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("token", token);
        navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  }

  return (
    <div 
      className="container-md bg-light rounded-3 p-5 mt-5 border border-dark"
      style={{ maxWidth: "720px" }}
    >
      <h1 className="row justify-content-center">Sign In to Your neoLib account.</h1>
      <form
        className="row justify-content-center"
        onSubmit={(e) => handleSubmit(e, usernameOrEmail as string, password as string)}>
        <div className="align-items-center">
          <label className="col-form-label">Username or Email:</label>
          <input
            className="form-control w-100"
            type="text"
            value={usernameOrEmail}
            placeholder="Please enter your username or email"
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="align-items-center">
          <label className="col-form-label">Password:</label>
          <input
            className="form-control w-100"
            type="password"
            value={password}
            minLength={8}
            maxLength={16}
            placeholder="Password must be between 8 and 16 characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="align-items-center">
          <label className="col-form-label">Don't have an account? <Link to="/signup">Sign Up</Link></label>
        </div>
        <button className="w-75 py-2 my-3 bg-success text-light rounded-2" type="submit"><b>Sign In</b></button>
        <div className="align-items-center py-2" style={{ height: "100px" }}>
          {error && <p className="text-danger"><b>{error}</b></p>}
        </div>
      </form>
    </div>
  );
}

async function handleSignIn(usernameOrEmail: string, password: string) {
  try {
    const formData = new FormData();
    formData.append("usernameOrEmail", usernameOrEmail);
    formData.append("password", password);
    const response = await axios.post('http://localhost:5000/auth/signin/', formData);
    if (response) {
      return response
    } else {
      return null
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}