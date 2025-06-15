export default interface BookType {
    isbn: string;
    title: string;
    publisher?: string;
    category?: "Literature" | "Social Studies" | "Science" | "Textbook" | "Business" | "Self-Help" | "Other";
    author?: string;
    pages?: string;
    language?: string;
    publication_year?: string;
    is_read?: boolean;
    file?: File;
    path?: string;
}