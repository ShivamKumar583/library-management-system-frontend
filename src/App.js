import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { useSelector } from 'react-redux';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AddBook from './components/AdminDashboard/AddBook';
import DeleteBook from './components/AdminDashboard/DeleteBook';
import BorrowBook from './components/UserDashboard/BorrowBook';
import ReturnBook from './components/UserDashboard/ReturnBook';
// import ProtectedRoute from './components/ProtectedRoute'; // Custom wrapper for auth protection

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div>
      <nav className=' text-center font-bold text-xl p-3 bg bg-slate-400'>
          Library Management System
      </nav>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        {user?.isAdmin && (
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="add-book" element={<AddBook />} />
            <Route path="delete-book" element={<DeleteBook />} />
          </Route>
        )}

        {/* User Routes */}
        {!user?.isAdmin && user && (
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="/dashboard/borrow-book" element={<BorrowBook />} />
            <Route path="return-book" element={<ReturnBook />} />
          </Route>
        )}

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
