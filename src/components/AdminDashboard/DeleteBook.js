import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getAllBooks } from "../../utils/bookAPI"; // Make sure to adjust the API path accordingly
import { AiOutlineDelete} from 'react-icons/ai'
const DeleteBook = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await dispatch(getAllBooks(token)); 
        setBooks(fetchedBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle Delete Book
  const handleDeleteBook = async (bookId) => {
    try {
      console.log(bookId);
      await dispatch(deleteBook(bookId, token)); 
      // Refresh the book list
      const fetchedBooks = await dispatch(getAllBooks(token));
      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Error deleting book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="font-bold text-lg">Delete a Book</h2>

        {/* Book List with Delete Button */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold text-gray-700">Books List</h3>
          {loading ? (
            <p>Loading books...</p>
          ) : books?.length > 0 ? (
            <ul className="mt-2 list-disc pl-6">
              {books.map((book) => (
                <li key={book._id} className="text-sm text-gray-600 border border-b-2 flex p-2 justify-between items-center">
                  <span>{book.title} by {book.author} ({book.publicationYear})</span>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="bg-red-500 text-sm text-white px-2 py-1 rounded"
                  >
                    <AiOutlineDelete/>
                    
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No books available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
