import { toast } from "react-hot-toast";
import { apiConnector } from "./ApiConnector";
import {  setToken } from "../slices/authSlice"
import {  setUser } from "../slices/profileSlice"

// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = process.env.REACT_APP_BASE_URL;


const LOGIN_API = BASE_URL + "/users/login";
const SIGNUP_API = BASE_URL + "/users/register";

// Login
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    //(LOGIN_API);

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (response.data.message !== "Login successfully") {
        throw new Error(response.data.message);
      }
    
      dispatch(setToken(response.data.user.token));
      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      toast.success("Login Successful");
      navigate("/dashboard")
    } catch (error) {
      toast.error("Login Failed");
    }
    toast.dismiss(toastId);
  };
}

// signup
export function signup(email, password,name, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    //(LOGIN_API);

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        email,
        password,
        name
      });

      if (response.data.message !== "User registration completed") {
        throw new Error(response.data.message);
      }
    
      
      toast.success("Signup Successful");
      navigate("/")
    } catch (error) {
      toast.error("Signup Failed");
    }
    toast.dismiss(toastId);
  };
}
