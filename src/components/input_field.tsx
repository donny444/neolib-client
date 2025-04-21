import { JSX } from "react";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";

export default function InputField({ property, type, book, setBook, }: InputFieldProps): JSX.Element {
  return (
    <>
      <label>{property}</label>
      {type === "text" || type === "number" ? (
        <input
          type={type}
          name={property}
          value={book?.[property as keyof BookType] ?? ""}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
        />
      ) : null}
      {type === "select" ? (
        <select
          name={type}
          value={book?.[property as keyof BookType] ?? ""}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
        >
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
          <option value="literature">Literature</option>
          <option value="business">Business</option>
          <option value="others">Others</option>
        </select>
      ) : null}
    </>
  );
}
