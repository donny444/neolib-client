import { useEffect, useState, JSX } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BookType from "../interfaces/book";
import InputFieldProps from "../interfaces/inputfield";
import EditBook from "../utils/editbook";
import DeleteBook from "../utils/deletebook";

export default function BookPage(): JSX.Element {
  const [data, setData] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [book, setBook] = useState<BookType>({} as unknown as BookType);
  // const fields = ["Title", "Publisher", "Category", "Author", "Pages", "Publication Year", "ISBN"];
  const uuid = useParams().uuid as string;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/books/${uuid}/`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.status !== 200) {
          navigate("/");
        }
        const data = response.data;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    };

    fetchBook();
  }, [uuid, navigate]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
      <button onClick={() => setEdit(!edit)}>{edit ? "Close Edit" : "Edit Book"}</button>
      <button onClick={async (e) => DeleteBook(e, uuid)}>Delete Book</button>
      {edit ?
        <form>
          <InputField property="title" type="text" book={book} setBook={setBook} />
          <InputField property="publisher" type="text" book={book} setBook={setBook} />
          <InputField property="category" type="select" book={book} setBook={setBook} />
          <InputField property="author" type="text" book={book} setBook={setBook} />
          <InputField property="page" type="number" book={book} setBook={setBook} />
          <InputField property="publication_year" type="number" book={book} setBook={setBook} />
          <InputField property="isbn" type="text" book={book} setBook={setBook} />
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

function InputField({ property, type, book, setBook }: InputFieldProps): JSX.Element {
  return (
    <>
      <label>{property}</label>
      {type === "text" || type === "number" ? (
        <input
          type={type}
          name={property}
          value={book[property as keyof BookType] || ""}
          onChange={(e) =>
            setBook({ ...book, [property]: e.target.value } as BookType)
          }
        />
      ) : null}
      {type === "select" ? (
        <select
          name={type}
          value={book[property as keyof BookType] || ""}
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
