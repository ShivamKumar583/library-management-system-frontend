import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { returnBook ,getAllBooksBorrowedByUser} from "../../utils/bookAPI"; 

const ReturnBookPage = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookToReturn, setBookToReturn] = useState(null);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // Fetch borrowed books
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const response = await dispatch(getAllBooksBorrowedByUser(user.id, token));
      setBorrowedBooks(response);
      console.log(response)
    };

    fetchBorrowedBooks();
  }, []);

  // Handle return book
  const handleReturnBook = async () => {
    console.log("kk")

    if (!bookToReturn) {
      setMessage("Please select a book to return.");
      return;
    }
    const response = await dispatch(returnBook(bookToReturn,user.id, token));
    console.log(response)
    if (response.data.success) {
      setBorrowedBooks(borrowedBooks.filter((book) => book.bookId !== bookToReturn));
    } else {
      setMessage("Error returning the book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="font-bold text-lg">Return Book</h2>

        {/* Success/Failure Message */}
        {message && (
          <div className={`mt-4 p-2 rounded-md ${message.includes("success") ? "bg-green-200" : "bg-red-200"}`}>
            {message}
          </div>
        )}

        {/* Book Selection */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold text-gray-700">Select a Book to Return</h3>
          <select
            value={bookToReturn}
            onChange={(e) => setBookToReturn(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
          >
            <option value="">--Select Book--</option>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book) => (
                <option key={book.bookId} value={book.bookId}>
                  {book.title} by {book.author}
                </option>
              ))
            ) : (
              <option disabled>No books borrowed.</option>
            )}
          </select>
        </div>

        {/* Return Button */}
        <div className="mt-6">
          <button
            onClick={handleReturnBook}
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Return Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPage;
