import axios, { AxiosResponse } from "axios";
import type BookType from "../interfaces/book";


export default async function AddBook(book: BookType): Promise<AxiosResponse | undefined> {
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
          "Authorization": sessionStorage.getItem("token") || "",
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}
