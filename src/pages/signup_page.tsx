import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth_context';

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent, username: string, email: string, password: string) => {
    e.preventDefault();
    const response = await handleSignUp(username, email, password);
    if (response?.status === 201) {
        const data: string = response?.data;
        console.log(data);
    } else {
      setError("Invalid username or password. Please try again.");
    }
  }

  return (
    <div
      className="container-md bg-light rounded-3 p-5 mt-5 border border-dark"
      style={{ maxWidth: "720px" }}
    >
      <h1 className="row justify-content-center">Sign Up to neoLib Bookshelf Platform!</h1>
      <form
        className="row justify-content-center" 
        onSubmit={(e) => handleSubmit(e, username as string, email as string, password as string)}>
        <div className="align-items-center">
          <label className="col-form-label">Username:</label>
          <input
            className="form-control w-100"
            type="text"
            value={username}
            minLength={3}
            maxLength={20}
            placeholder="Username must be between 3 and 20 characters"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="align-items-center">
          <label className="col-form-label">Email:</label>
          <input
            className="form-control w-100"
            type="email"
            value={email}
            placeholder="Please enter your email"
            onChange={(e) => setEmail(e.target.value)}
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
        {error && <p className="text-danger"><b>{error}</b></p>}
        <button className="w-75 py-2 my-3 bg-success text-light rounded-2" type="submit"><b>Sign Up</b></button>
      </form>
    </div>
  );
}

async function handleSignUp(username: string, email: string, password: string) {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post('http://localhost:5000/auth/signup/',
        formData,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
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