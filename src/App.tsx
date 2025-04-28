import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BooksPage,
  BookPage,
  NewBookPage,
  SignInPage,
  SignUpPage,
} from "./pages";
import { AuthProvider } from "./contexts/auth_context";
import "./App.css";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/:uuid" element={<BookPage />} />
          <Route path="/new-book" element={<NewBookPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
