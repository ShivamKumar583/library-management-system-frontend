import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../utils/bookAPI"; // Make sure to adjust the API path accordingly
import toast from "react-hot-toast";

const AddBook = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState({ title: "", author: "", publicationYear: ""});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.publicationYear) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await dispatch(addBook(newBook, token)); 
      setNewBook({ title: "", author: "", publicationYear: ""});
      setError(""); 
      toast.success("Book added successfully!");
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Error adding book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="font-bold text-lg">Add New Book</h2>

        {/* Add Book Form */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold text-gray-700">Add a New Book</h3>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleAddBookSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              placeholder="Book Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              placeholder="Author"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="publicationYear"
              value={newBook.publicationYear}
              onChange={handleInputChange}
              placeholder="Publication Year"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
