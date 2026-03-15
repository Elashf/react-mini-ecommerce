import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
 
  const[email , setEmail]=useState('')
  const[pass , setPass]=useState('')
  const user = useSelector((state)=> state.auth.user)
  const dispatch= useDispatch()
  const navigate =useNavigate()
  const location= useLocation()
  const from= location.state?.from?.pathname || "/"
 


if(user) return <Navigate to="/" />

const handleSubmit = (e)=>{
  e.preventDefault()
const fakeUser ={
  email ,
  name:"Ela"
}
dispatch(login(fakeUser))
navigate(from  , {replace: true})
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-800 via-indigo-900 to-gray-900">
      <div className="bg-gray-300 p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
         Wellcome👋
        </h2>

        <form
        onSubmit={handleSubmit}
        className="space-y-5">

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value) }
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
             
            
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password </label>
            <input
              name="pass"
              value={pass}
              onChange={(e)=> setPass(e.target.value)}
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              
              
              required
            />
          </div>

          <button
            
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 to-pink-700 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          dont have an account{" "}
          <span className="text-purple-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;