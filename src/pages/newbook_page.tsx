import { useState, JSX } from "react";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";
import InputField from "../components/input_field";
import AddBook from "../utils/addbook";

export default function NewBookPage(): JSX.Element {
  const [book, setBook] = useState<BookType>({} as unknown as BookType);
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
        onSubmit={(e) => {
          e.preventDefault();
          AddBook(book);
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


