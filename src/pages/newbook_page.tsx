import { useState, JSX } from "react";
import axios from "axios";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";
import InputField from "../components/input_field";

export default function NewBookPage(): JSX.Element {
  const [book, setBook] = useState<BookType>({} as unknown as BookType);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const fields: InputFieldProps[] = [
    { property: "title", type: "text", setBook: setBook },
    { property: "publisher", type: "text", setBook: setBook },
    { property: "category", type: "select", setBook: setBook },
    { property: "author", type: "text", setBook: setBook },
    { property: "page", type: "number", setBook: setBook },
    { property: "publication_year", type: "number", setBook: setBook },
    { property: "isbn", type: "text", setBook: setBook },
  ];

  return (
    <>
      <h1>Add New Book</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post(
              "http://localhost:5000/books/",
              book,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 201) {
              setSuccess(true);
              setMessage("Book added successfully!");
            } else {
              setError(true);
              setMessage("Failed to add book.");
            }
          } catch (error) {
            console.error("Error adding book:", error);
            setError(true);
            setMessage("Failed to add book.");
          }
        }}
      >
        <div>
          <label htmlFor="image">Upload Book Cover:</label>
          <input
            type="file"
            name="book_image"
            accept="image/*"
            onChange={(e) => { setBook({ ...book, file: e.target.files?.[0] }); }}
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
      {error && <p style={{ color: "red" }}>{message}</p>}
      {success && <p style={{ color: "green" }}>{message}</p>}
    </>
  );
}
