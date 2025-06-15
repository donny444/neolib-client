import { useEffect, useState, JSX } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BookType from "../interfaces/book";
import InputField from "../components/input_field";
import EditBook from "../utils/editbook";
import CheckBook from "../utils/checkbook";
import DeleteBook from "../utils/deletebook";
import { useAuth } from "../contexts/auth_context";

export default function BookPage(): JSX.Element {
  // const [data, setData] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [book, setBook] = useState<BookType>({} as unknown as BookType);
  const isbn = useParams().isbn as string;
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/books/${isbn}/`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Authorization": sessionStorage.getItem("token") || "",
            },
          }
        );
        if (response.status !== 200) {
          navigate("/");
        }
        const bookData = response.data;
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book data:", error);
        navigate("/");
      }
    };

    fetchBook();
  }, [isbn, navigate]);

  return (
    <>
      <Link to="/">
        <img src="src/assets/icons/back.svg" alt="Back" />
      </Link>
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> data from HTML response */ }
      {book ?
        <>
          <div
            className="container-md d-flex flex-column w-50 p-3 mx-auto border border-2 border-dark rounded-3"
            style={{ maxWidth: "720px" }}
          >
            <p className="text-center mb-1"><b>{book.title}</b></p>
            <p className="text-center mb-1"><b>ISBN: {book.isbn}</b></p>
            <p className="text-start mb-1"><b>Publisher:</b> {book.publisher}</p>
            <p className="text-start mb-1"><b>Category:</b> {book.category}</p>
            <p className="text-start mb-1"><b>Author:</b> {book.author}</p>
            <p className="text-start mb-1"><b>Pages:</b> {book.pages}</p>
            <p className="text-start mb-1"><b>Language:</b> {book.language}</p>
            <p className="text-start mb-1"><b>Publication Year:</b> {book.publication_year}</p>
          </div>
          <div
            className="text-center my-2 d-flex justify-content-center gap-2"
          >
            <button onClick={() => setEdit(!edit)}
              className="btn btn-warning"
            >
              {edit ? "Close Edit" : "Edit Book"}
            </button>
            <button onClick={async (e) => {
              DeleteBook(e, isbn)
              navigate("/");
            }}
              className="btn btn-danger"
            >
              Delete Book
            </button>
          </div>
          <label className="form-check-label mt-2">Read:</label>
          <input
            type="checkbox"
            title="is_read"
            checked={book.is_read}
            onChange={async (e) => {
              CheckBook(e, isbn, book.is_read);
              setBook({ ...book, is_read: e.target.checked });
            }}
          />
        </>
        : <></>}
      {edit ?
        <form
          className="container-md d-flex flex-column w-50 p-3 mx-auto"
          style={{ maxWidth: "720px" }} 
        >
          <InputField property="title" type="text" book={book} setBook={setBook} />
          <InputField property="publisher" type="text" book={book} setBook={setBook} />
          <InputField property="category" type="select" book={book} setBook={setBook} />
          <InputField property="author" type="text" book={book} setBook={setBook} />
          <InputField property="pages" type="number" book={book} setBook={setBook} />
          <InputField property="publication_year" type="number" book={book} setBook={setBook} />
          <InputField property="isbn" type="text" book={book} setBook={setBook} />
          <input className="btn-success py-2 mt-3 border-0 rounded-2" type="submit" value="Submit" onSubmit={async (e) => {
            const result = await EditBook(e, book, isbn);

            if (result) {
              setBook(undefined as unknown as BookType);
              setEdit(false);
            } else {
              setError(true);
            }
          }}
          />
        </form>
        : <></>}
      {error && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          Failed to update the book!
        </div>
      )}

      {error &&
        setTimeout(() => {
          setError(false);
        }, 3000)}
    </>
  );
}
