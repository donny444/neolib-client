export default interface BookType {
    uuid: string;
    title: string;
    publisher: string;
    category: string;
    author: string;
    page: number;
    language: string;
    publication_year: number;
    isbn: string;
    file?: Blob;
}