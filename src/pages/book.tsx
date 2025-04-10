import { useEffect, useState, JSX } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";
import EditBook from "../utils/editbook";
import DeleteBook from "../utils/deletebook";

export default function Book(): JSX.Element {
  const [data, setData] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [book, setBook] = useState<BookType>(undefined as unknown as BookType);
  const uuid = useParams().uuid as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/server/${uuid}/`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uuid]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
      <button onClick={() => setEdit(!edit)}>{edit ? "Close Edit" : "Edit Book"}</button>
      <button onClick={async (e) => DeleteBook(e, uuid)}>Delete Book</button>
      {edit ?
        <form>
          {Object.keys(book).map((property) => (
            <InputField key={property} property={property} book={book} setBook={setBook} />
          ))}
          <input type="submit" value="Submit" onSubmit={async (e) => {
            const result = await EditBook(e, book, uuid);

            if (result) {
              setBook(undefined as unknown as BookType);
              setEdit(false);
            } else {
              setError(true);
            }
          }}
          />
        </form>
        : null}
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

function InputField({ property, book, setBook }: InputFieldProps): JSX.Element {
  return (
    <>
      <label>{property}</label>
      {typeof property === "string" ? (
        <input
          type="text"
          name={property}
          value={book[property as keyof BookType] || ""}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
        />
      ) : null}
      {typeof property === "number" ? (
        <input
          type="number"
          name={property}
          value={book[property as keyof BookType] || ""}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
        />
      ) : null}
    </>
  );
}
