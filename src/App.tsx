import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BooksPage, BookPage, NewBookPage } from "./pages";
import "./App.css";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/:uuid" element={<BookPage />} />
          <Route path="/new-book" element={<NewBookPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
