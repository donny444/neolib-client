import { JSX } from "react";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";

export default function InputField({ property, type, book, setBook, }: InputFieldProps): JSX.Element {
  return (
    <>
      <label htmlFor={property}>{property}</label>
      {type === "text" || type === "number" ? (
        <input
          type={type}
          name={property}
          value={book?.[property as keyof BookType] as string | undefined}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
        />
      ) : null}
      {type === "select" ? (
        <select
          name={property}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
          defaultValue={book?.[property as keyof BookType] as string | undefined}
        >
          <option value="">{`Select ${property}`}</option>
          <option value="Literature">Literature</option>
          <option value="Social Studies">Social Studies</option>
          <option value="Science">Science</option>
          <option value="Textbook">Textbook</option>
          <option value="Business">Business</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Other">Other</option>
        </select>
      ) : null}
    </>
  );
}
