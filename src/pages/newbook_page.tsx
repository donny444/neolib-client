import { useState, JSX, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";
import InputField from "../components/input_field";
import AddBook from "../utils/addbook";
import { useAuth } from "../contexts/auth_context";

export default function NewBookPage(): JSX.Element {
  const [book, setBook] = useState<BookType>({} as unknown as BookType);
  const fields: InputFieldProps[] = [
    { property: "title", type: "text", setBook: setBook },
    { property: "publisher", type: "text", setBook: setBook },
    { property: "category", type: "select", setBook: setBook },
    { property: "author", type: "text", setBook: setBook },
    { property: "pages", type: "number", setBook: setBook },
    { property: "language", type: "text", setBook: setBook },
    { property: "publication_year", type: "number", setBook: setBook },
    { property: "isbn", type: "text", setBook: setBook },
  ];
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Link to="/">Back</Link>
      <div className="container-md"
        style={{ maxWidth: "720px" }}
      >
        <h3 className="display-6 text-center mb-3">Add New Book</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await AddBook(book);
            if (response?.status === 201) {
              navigate("/");
            } else {
              console.log(response?.data);
            }
          }}
          encType="multipart/form-data"
        >
          <div className="row g-2 w-100 mb-2">
            <div className="col-auto">
              <label className="col-form-label" htmlFor="image"><b>Upload Book Cover:</b></label>
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                type="file"
                name="image"
                accept="image/*"
                title="Upload Book Cover"
                placeholder="Upload Book Cover"
                onChange={(e) => {
                  setBook({ ...book, file: e.target.files?.[0] });
                }}
              />
            </div>
          </div>
          {fields.map((field) => (
            <InputField
              key={field.property}
              property={field.property}
              type={field.type}
              book={book}
              setBook={setBook}
            />
          ))}
          <input className="btn btn-success w-100 py-2" type="submit" value="Add Book" />
        </form>
      </div>
    </>
  );
}


