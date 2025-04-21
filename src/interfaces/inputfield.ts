import BookType from './book';

export default interface InputFieldProps {
    property: string;
    type: "text" | "number" | "select";
    book?: BookType;
    setBook: React.Dispatch<React.SetStateAction<BookType>>;
}