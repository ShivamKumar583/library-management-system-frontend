import { toast } from "react-hot-toast";
import { apiConnector } from "./ApiConnector";
import {  setToken } from "../slices/authSlice"
import {  setUser } from "../slices/profileSlice"

const BASE_URL = "http://localhost:4000/api/v1";

const GET_BOOKS_BORROWED_BY_USER_API = BASE_URL + "/books/borrowedByUser";
const GET_BOOKS_BY_AVAILABLITY_API = BASE_URL + "/books/getAllBooksByAvailability";
const LAST_TRANSACTION_OF_USER_API = BASE_URL + "/books/transactions/last";
const BORROW_BBOK_API = BASE_URL + "/books/borrow";
const RETURN_BOOK_API = BASE_URL + "/books/return";

// ADMIN APIs
const GET_TOTAL_BOOKS_API = BASE_URL + "/books/getTotalNumberOfBooks";
const ADD_BOOK_API = BASE_URL + "/books/add";
const GET_ALL_BOOKS_API = BASE_URL + "/books/getAllBooks";
const DELETE_BOOK_API = BASE_URL + "/books/delete";

// GET_BOOKS_BORROWED_BY_USER_API
export function getAllBooksBorrowedByUser(userId,token,navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", `${GET_BOOKS_BORROWED_BY_USER_API}/${userId}`, null,{
        authorization:`${token}`
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("Error while fetching the data for borrowed books");
    }
  };
}

// LAST_TRANSACTION_OF_USER_API
export function getLastTransactionByUser(userId,token,navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", `${LAST_TRANSACTION_OF_USER_API}/${userId}`, null,{
        authorization:`${token}`
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error("Error while fetching the data for last transaction");
    }
  };
}

// GET_BOOKS_BY_AVAILABLITY_API
export function getAllBooksByAvailability(token,navigate) {
  return async (dispatch) => {
    
    try {
      const response = await apiConnector("GET", `${GET_BOOKS_BY_AVAILABLITY_API}`, null,{
        authorization:`${token}`
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.books;
    } catch (error) {
      toast.error("Error while fetching the data for last transaction");
    }
  };
}

// RETURN_BOOK_API
export function returnBook(bookId,userId,token,navigate) {
  return async (dispatch) => {
    
    try {

      const response = await apiConnector("POST", `${RETURN_BOOK_API}/${bookId}`, 
        {
            userId
        },{
        authorization:`${token}`
      });


      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      else toast.success("Book returned successfully")
      return response;
    } catch (error) {
      toast.error("Error while fetching the data for last transaction");
    }
  };
}
// BORROW_BBOK_API
export function borrowBook(bookId,userId,token,navigate) {
  return async (dispatch) => {
    
    try {
      const response = await apiConnector("POST", `${BORROW_BBOK_API}/${bookId}`, 
        {
            userId,bookId
        },{
        authorization:`${token}`
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      else toast.success("Book borrowed successfully")
    } catch (error) {
      toast.error("Error while fetching the data for last transaction");
    }
  };
}




// FOR ADMIN

// GET_TOTAL_BOOKS_API
export function getTotalNumberOfBooks(token,navigate) {
    return async (dispatch) => {
      
      try {
        const response = await apiConnector("GET", `${GET_TOTAL_BOOKS_API}`, null,{
          authorization:`${token}`
        });
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        return response.data.totalBooks;
      } catch (error) {
        toast.error("Error while fetching the data for last transaction");
      }
    };
  }


  // ADD_BOOK_API
export function addBook(newBook,token,navigate) {
    return async (dispatch) => {
      
      try {
        const response = await apiConnector("POST", `${ADD_BOOK_API}`, 
          {
              newBook
          },{
          authorization:`${token}`
        });
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        toast.error("Error while adding the book");
      }
    };
  }

// GET_ALL_BOOKS_API
export function getAllBooks(token,navigate) {
    return async (dispatch) => {
      
      try {
        const response = await apiConnector("GET", `${GET_ALL_BOOKS_API}`, null,{
          authorization:`${token}`
        });
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        return response.data.books;
      } catch (error) {
        toast.error("Error while fetching the data for last transaction");
      }
    };
  }

    // DELETE_BOOK_API
export function deleteBook(bookId,token,navigate) {
    return async (dispatch) => {
      
      try {
        const response = await apiConnector("DELETE", `${DELETE_BOOK_API}/${bookId}`, 
          null,{
          authorization:`${token}`
        });
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        else toast.success("Book Deleted Successfully")
      } catch (error) {
        toast.error("Error while adding the book");
      }
    };
  }






