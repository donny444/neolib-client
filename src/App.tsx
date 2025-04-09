import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Books, Book } from "./pages";
import "./App.css";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<div>Main page of all books in library</div>}
          />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:uuid" element={<Book />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
