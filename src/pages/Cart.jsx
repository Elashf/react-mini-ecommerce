import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrement, increment, removeFromCart } from "../redux/cartSlice";

function Cart() {
 
  const cartItems = useSelector((state)=> state.cart.items)
 const dispatch = useDispatch()


 if(cartItems.length=== 0){
  return(
<div className="text-center my-50">
<h1>cart is empty</h1></div>)
 }else{

  return (
    
    <div className="container mx-auto mt-15 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Product</th>
              <th className="px-3 py-2 whitespace-nowrap">Price</th>
              <th className="px-3 py-2 whitespace-nowrap">Quantity</th>
              <th className="px-3 py-2 whitespace-nowrap">Subtotal</th>
              <th className="px-3 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
         
         {cartItems.map((item)=>{
          return(
            <tbody key={item.id} className="divide-y divide-gray-200 *:even:bg-gray-50">
            <tr className="*:text-gray-900 *:first:font-medium">
              <td className="px-3 py-2 ">
                <div className="flex gap-x-4">
                  <img
                    src={item.thumbnail}
                    alt="img"
                    className="aspect-square size-20 rounded-sm object-cover"
                  />
                  <div>
                    <h1 className="font-bold">{item.name}</h1>
                    <p className="text-xs mr-14">{item.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{item.price}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center gap-x-3">
                  <button
                  onClick={()=>dispatch(decrement(item.id))}
                  className="cursor-pointer rounded-sm border border-gray-700 bg-gray-700 px-2 py-0.25 text-lg font-medium text-white focus:ring-3 focus:outline-hidden">
                    -
                  </button>
                  <p>{item.qty}</p>
                  <button
                  onClick={()=> dispatch(increment(item.id))}
                  className="cursor-pointer rounded-sm border border-gray-700 bg-gray-700 px-2 py-0.25 text-lg font-medium text-white focus:ring-3 focus:outline-hidden">
                    +
                  </button>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{item.price*item.qty}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <button
               onClick={()=>dispatch(removeFromCart(item))}
                className="cursor-pointer rounded-sm border border-red-600 bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>)
         })}
            
           
          
          
         
        </table>

        <hr />

        <div className="mt-5 flex justify-between items-center">
          <button
          onClick={()=>dispatch(clearCart())}
          className="cursor-pointer rounded-sm border border-gray-800 bg-gray-800 px-4 py-2 text-sm font-medium text-white focus:ring-3 focus:outline-hidden">
            Clear Cart
          </button>
          <h1 className="text-xl font-bold">
            Total: {cartItems.reduce((total , item)=>{
              return total + item.price * item.qty
            },0)}
            </h1>
        </div>
      </div>
    </div>
  )}
}

export default Cart;
