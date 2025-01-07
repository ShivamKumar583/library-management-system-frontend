import React from 'react'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from '../utils/authAPI'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form
          onSubmit={handleOnSubmit}
          className="mt-6 flex flex-col gap-y-4"
        >
          <label className="w-full">
            <p className="mb-1 text-sm text-gray-700">
              Email Address <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-700">
              Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-lg border border-gray-300 p-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#6b7280" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#6b7280" />
              )}
            </span>
          </label>
          <Link to="/signup">
            <p className="mt-1 text-right text-sm text-blue-500 hover:underline">
              New User? Signup
            </p>
          </Link>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-500 py-3 text-white font-medium hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
  
  
}

export default Login