import { JSX } from "react";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";

export default function InputField({ property, type, book, setBook, }: InputFieldProps): JSX.Element {
  return (
    <div className="mb-2 row g-2 w-100">
      <div className="col-auto">
        <label className="col-form-label" htmlFor={property}><b>{property}:</b></label>
      </div>
      {type === "text" || type === "number" ? (
        <div className="col">
          <input
            className="form-control w-100"
            type={type}
            name={property}
            value={book?.[property as keyof BookType] as string | undefined}
            onChange={(e) =>
              setBook({ ...book, [property]: e.target.value } as BookType)
            }
          />
        </div>
      ) : null}
      {type === "select" ? (
        <div className="col">
          <select
            className="form-select w-100"
            title="Select Category"
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
        </div>
      ) : null}
    </div>
  );
}
