import axios from "axios";
import { FormEvent } from "react";

export default async function DeleteBook(e: FormEvent, uuid: string): Promise<string | undefined> {
    try {
        e.preventDefault();
        const response = await axios.delete(
            `http://localhost:5000/server/${uuid}/`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        if (response.status === 200) {
            console.log("Book deleted successfully:", response.data);
            return response.data;
        } else {
            console.error("Failed to delete book:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}