import React from 'react'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signup } from '../utils/authAPI'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name:""
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password,name } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(signup(email, password,name, navigate))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
        <form
          onSubmit={handleOnSubmit}
          className="mt-6 flex flex-col gap-y-4"
        >
          {/* Name */}
          <label className="w-full">
            <p className="mb-1 text-sm text-gray-700">
              Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          {/* email */}
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

          {/* password */}
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
          <Link to="/">
            <p className="mt-1 text-right text-sm text-blue-500 hover:underline">
              Have an account? Login
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