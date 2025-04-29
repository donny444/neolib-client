import { useEffect, useState, useCallback, JSX } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";

export default function BooksPage(): JSX.Element {
  const [data, setData] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/books/", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": sessionStorage.getItem("token") || ""
          },
          params: {
            category: category,
          }
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [category]);

  useEffect(() => {
    fetchBooks();
  }, [category, fetchBooks]);

  return (
    <div>
      <h1>All Books in the Library</h1>
      <select onChange={(e) => {
          setCategory(e.target.value);
          fetchBooks();
        }}
        value={category}
      >
        <option value="">All</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Non-Fiction</option>
        <option value="literature">Literature</option>
        <option value="business">Business</option>
        <option value="others">Others</option>
      </select>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
