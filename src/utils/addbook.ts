import axios from "axios";
import type BookType from "../interfaces/book";


export default async function AddBook(book: BookType)  {
  const formData = new FormData();

  for (const key in book) {
    if (book[key as keyof BookType] !== undefined) {
      formData.append(key, book[key as keyof BookType] as string | Blob);
    }
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/books/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 201) {
      console.log(response.data);
      return response.data;
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}
