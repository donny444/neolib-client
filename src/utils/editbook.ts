import axios from "axios";
import type Book from "../interfaces/book";
import { FormEvent } from "react";

export default async function EditBook(e: FormEvent, book: Book, uuid: string): Promise<string | undefined> {
    try {
        e.preventDefault();
        const response = await axios.put(
            `http://localhost:5000/server/${uuid}/`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(book),
            }
        );
        if (response.status === 200) {
            console.log("Book updated successfully:", response.data);
            return response.data;
        }
        else {
            console.error("Failed to update book:", response.statusText);
        }
    } catch (error) {
        console.error("Error updating book:", error);
    }
}