# Frontend - Library Management System

This is the **frontend** application for the Library Management System. It is built using **React.js** and provides an interface for users and administrators to interact with the library system.

## Features

- User login and registration
- View available books and borrow them
- View borrowed books and return them
- Admin dashboard to manage books (add and delete)
- Real-time updates of borrowed and available books

## Technologies Used

- **React.js** for building the user interface
- **Redux** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation between pages
- **Axios** for making API requests to the backend

## Installation

Follow the steps below to set up the frontend locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/frontend-repo.git
   cd frontend-repo

2. Install dependencies:

    ```bash
    npm install

3. Create .env file:
    You will need to create a .env file in the root directory with the following content:
    ``env
    REACT_APP_API_URL=http://localhost:4000/api/v1

    Replace http://localhost:5000/api with the actual API URL where your backend is hosted.

4. Start the development server:
    ```bash
    npm start

    Your frontend application will be running on http://localhost:3000.


# Folder Structure
/src
  /components     # Reusable components (buttons, input fields, etc.)
  /reducer        # Redux store
  /slices         # Actions, and reducers
  /pages          # Individual pages (Home, Login, Dashboard, etc.)
  /utils          # Utility functions (API calls, helpers, etc.)
  /App.js         # Main app component
  /index.js       # Entry point for React


# API Endpoints
    The frontend interacts with the following backend API endpoints:

    POST /api/v1/users/login - User login
    POST /api/v1/users/registe - User registration
    GET /api/v1/books/getAllBooks - Get all books
    GET /api/v1/books/borrowedByUser - Get borrowed books for the user
    POST /api/v1/books/borrow/:bookId - Borrow a book
    POST /api/v1/books/return/:bookId - Return a borrowed book
    POST /api/v1/books/add (Admin only) - Add a new book
    DELETE /api/v1/books/:bookId (Admin only) - Delete a book


# Development
    To contribute or make changes, follow these steps:

    Fork the repository and clone it to your local machine.
    Create a new branch for your changes.
    Make your changes and commit them.
    Push your changes to your forked repository.
    Create a Pull Request for your changes to be reviewed and merged.

# Demo For Library Management System
    [Demo Video on Youtube](https://youtu.be/TRPVZrmCj6o)