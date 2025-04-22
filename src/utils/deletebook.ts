import axios from "axios";
import { FormEvent } from "react";

export default async function DeleteBook(e: FormEvent, uuid: string): Promise<string | undefined> {
    try {
        e.preventDefault();
        const response = await axios.delete(
            `http://localhost:5000/books/${uuid}/`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        if (response.status === 204) {
            console.log("Deleted the book specified by the UUID: ", uuid);
            return
        } else {
            console.error(response.data);
        }
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}