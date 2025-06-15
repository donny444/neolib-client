import axios from "axios";
import { FormEvent } from "react";

export default async function CheckBook(e: FormEvent, isbn: string, check: boolean | undefined): Promise<string | undefined> {
    try {
        e.preventDefault();
        const response = await axios.put(
            `http://localhost:5000/books/${isbn}/check/`,
            {
                "check": check
            },
            {
                headers: {
                    "Authorization": sessionStorage.getItem("token") || "",
                }
            }
        );
        if (response.status === 200) {
            console.log("Read status updated successfully:", response.data);
            return response.data;
        }
        else {
            console.error("Failed to update read status:", response.statusText);
        }
    } catch (error) {
        console.error("Error updating read status:", error);
    }
}