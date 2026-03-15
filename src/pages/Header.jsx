import { BsCart4 } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { logout } from "../redux/authSlice"



function Header() {
   const items =useSelector((state)=> state.cart.items)  
   const user =useSelector((state)=> state.auth.user)  
   const dispatch = useDispatch()

  return (
    <><div className="bg-blue-100/50 shadow-xl ">
     <h1 className='text-center font-bold text-xl text-indigo-800 py-5'>Products</h1>
     <Link to="/cart"><BsCart4 className='absolute top-5 left-3 text-green-700  text-2xl '/></Link>
<p className='absolute top-4 left-10 border border-green-900 rounded-full px-1 text-xs font-bold bg-green-100/50'>{items.length}</p>


<div className="text-sm absolute top-5 right-3">


</div>

{user ?
<span className="absolute top-1 right-1 text-center"><p className="text-xs pt-1 text-gray-400">Hi {user.name}</p>
<button
onClick={()=>dispatch(logout())}
className="text-blue-500 text-sm cursor-pointer">Logout</button>
</span>
:
 <>
  <Link to="/login"><h2 className="absolute top-5 right-8 text-indigo-700 ">Login</h2>
<i
className="bi bi-box-arrow-in-right absolute top-5 right-3 text-xl text-indigo-600"></i></Link>

  </>
}
   



<hr className='text-indigo-300 shadow-lg'/>
</div>
    </>
  )
}

export default Header