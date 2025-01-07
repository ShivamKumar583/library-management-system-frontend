import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { borrowBook, getAllBooksByAvailability } from '../../utils/bookAPI';

const BorrowBook = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token } = useSelector((state) => state.auth); 
  const {user} = useSelector((state) => state.profile); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await dispatch(getAllBooksByAvailability(token)); // Assuming this action returns books
        setAvailableBooks(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks(); // Call the async function
  }, [dispatch, token]);

  const handleBorrowBook = async (bookId) => {
    try {
      console.log(bookId);
      await dispatch(borrowBook(bookId, user.id, token));
    } catch (error) {
      console.error('Error borrowing the book:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="w-3/4">
        <h2 className="font-bold text-lg">Borrow a Book</h2>

        {/* Available Books List */}
        {loading ? (
          <p>Loading available books...</p>
        ) : availableBooks?.length > 0 ? (
          <ul className="mt-6 list-disc pl-6 ">
            {availableBooks.map((book) => (
              <li key={book._id} className="text-sm p-1 text-gray-600 flex justify-between items-center border-b-2 border">
                <span>
                  {book.title} by {book.author} ({book.publicationYear})
                </span>
                <button
                  onClick={() => handleBorrowBook(book._id)}
                  className="ml-4 bg-green-500 hover:bg-green-700 text-white p-2 rounded"
                >
                  Borrow
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available to borrow.</p>
        )}
      </div>
    </div>
  );
};

export default BorrowBook;
