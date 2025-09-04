import axios, { AxiosResponse } from "axios";

export async function GetTopCategories(): Promise<AxiosResponse | undefined> {
  try {
    const response = await axios.get(
      "http://localhost:5000/advanced/top-five-categories",
      {
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      }
    );
    
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function GetReadingStatus(): Promise<AxiosResponse | undefined> {
  try {
    const response = await axios.get(
      "http://localhost:5000/advanced/reading-status",
      {
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      }
    );
    
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function GetBooksByPages(): Promise<AxiosResponse | undefined> {
  try {
    const response = await axios.get(
      "http://localhost:5000/advanced/books-by-pages",
      {
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      }
    );
    
    return response;
  } catch (err) {
    console.error(err);
  }
}