export default interface BookType {
    isbn: string;
    title: string;
    publisher?: string;
    category?: string;
    author?: string;
    page?: string;
    language?: string;
    publication_year?: string;
    file?: File;
}