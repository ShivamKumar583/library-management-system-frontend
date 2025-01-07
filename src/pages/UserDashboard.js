import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getAllBooksBorrowedByUser,
  getLastTransactionByUser,
} from "../utils/bookAPI";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [lastTransaction, setLastTransaction] = useState(null);
  const [recentBorrowedBooks, setRecentBorrowedBooks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await dispatch(getAllBooksBorrowedByUser(user.id, token));
        const lastTransaction = await dispatch(getLastTransactionByUser(user.id, token));
  
        setRecentBorrowedBooks(books);
        setLastTransaction(lastTransaction); 
        console.log(lastTransaction)
        
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };
  
    fetchBooks(); 
  }, []); 
  


  return  (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-500 text-white p-4">
        <h2 className=" md:text-2xl text-md  font-bold mb-6">User - Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="borrow-book"
            className="hover:bg-blue-600 p-2 rounded"
          >
            Borrow Book
          </Link>
          <Link
            to="return-book"
            className="hover:bg-blue-600 p-2 rounded"
          >
            Return Book
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="font-bold text-lg">Hi {user.name} 👋</h2>

        

        {/* Last Transaction */}
        
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-700">
              Last Transaction:
            </h3>
            {lastTransaction ? (
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Book:</strong> {lastTransaction.bookTitle}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Type:</strong>{" "}
                  {lastTransaction.type === "borrow" ? "Borrowed" : "Returned"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(lastTransaction.date).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No recent transactions found.
              </p>
            )}
          </div>
        

        {/* Recently Borrowed Books */}
        
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-700">
              Recently Borrowed Books:
            </h3>
            {recentBorrowedBooks?.length > 0 ? (
              <ul className="mt-2 list-disc pl-6">
                {recentBorrowedBooks.map((book) => (
                  <li key={book._id} className="text-sm text-gray-600">
                    {book.title} by {book.author} ({book.publicationYear})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No recently borrowed books.</p>
            )}
          </div>
        

        {/* Nested Routes */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
