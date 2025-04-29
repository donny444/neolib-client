import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth_context';

export default function SignInPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent, usernameOrEmail: string, password: string) => {
    e.preventDefault();
    const response = await handleSignIn(usernameOrEmail, password);
    if (response?.status === 200) {
        const token = response?.data;
        sessionStorage.setItem("token", token);
        navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className="signin-page">
      <h1>Sign In</h1>
      <form onSubmit={(e) => handleSubmit(e, usernameOrEmail as string, password as string)}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            value={usernameOrEmail}
            placeholder="Please enter your username or email"
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            minLength={8}
            maxLength={16}
            placeholder="Password must be between 8 and 16 characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
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