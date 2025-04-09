import BookType from './book';

export default interface InputFieldProps {
    property: string;
    book: BookType;
    setBook: React.Dispatch<React.SetStateAction<BookType>>;
}