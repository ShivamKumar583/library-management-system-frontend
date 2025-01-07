import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getTotalNumberOfBooks,
  // getAllUsers,
  // getAllTransactions,
} from "../utils/bookAPI"; // You should create appropriate API functions for admin

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth); 
  const { user } = useSelector((state) => state.profile); 
  const dispatch = useDispatch();
  const [allBooks, setAllBooks] = useState(0);
  const navigate = useNavigate();


  // Fetching data when the component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const books = await dispatch(getTotalNumberOfBooks(token)); 
        setAllBooks(books);
      } catch (err) {
        console.error("Error fetching admin data: ", err);
      }
    };

    fetchAdminData();
  }, [dispatch, token]);

  


  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-500 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Admin - Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard/add-book"
            className="hover:bg-blue-600 p-2 rounded"
          >
            Add Book
          </Link>
          <Link
            to="/dashboard/delete-book"
            className="hover:bg-blue-600 p-2 rounded"
          >
            Delete book
          </Link>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="font-bold text-lg">Hello, Admin 👋</h2>

        

        {/* All Books */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold text-gray-700">Total No. Of Books: {allBooks}</h3>
        </div>




        {/* Nested Routes */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
