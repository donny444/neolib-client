import { useState, JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h1>Add New Book</h1>
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
        <div>
          <label htmlFor="image">Upload Book Cover:</label>
          <input
            type="file"
            name="book_image"
            accept="image/*"
            onChange={(e) => {
              setBook({ ...book, file: e.target.files?.[0] });
            }}
          />
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
        <input type="submit" value="Add Book" />
      </form>
    </>
  );
}


