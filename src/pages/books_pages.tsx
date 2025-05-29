import { useEffect, useState, useCallback, JSX } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";

export default function BooksPage(): JSX.Element {
  const [data, setData] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
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
            searchTerm: searchTerm,
            category: category,
          }
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [searchTerm, category]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div
      className="container-md d-flex flex-column justify-content-center align-items-center"
      style={{ maxWidth: "720px" }}
    >
      <h3 className="display-6 text-center">All Books in Your Bookshelf</h3>
      <div className="row w-75 my-2">
        <div className="col-9">
          <input
            className="form-control"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setTimeout(() => {
              //   const currentSearchTerm = searchTerm
              //   if (currentSearchTerm === searchTerm) {
              //     fetchBooks();
              //   }
              // }, 2000);
              fetchBooks();
            }}
          />
        </div>
        <div className="col">
          <select onChange={(e) => {
              setCategory(e.target.value);
              fetchBooks();
            }}
            className="form-select"
            title="Select a category"
            name="category"
            value={category}
          >
            <option value="">All</option>
            <option value="Literature" >Literature</option>
            <option value="Social Studies" >Social Studies</option>
            <option value="Science">Science</option>
            <option value="Text">Textbook</option>
            <option value="Business">Business</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {!data || data.length === 0 ? 
        <p>You don't have any book in your library yet.</p>
      :
        <div
          className="row g-4 gap-3 mx-auto my-2"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      }
    </div>
  );
}
