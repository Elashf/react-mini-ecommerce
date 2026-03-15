import  { useEffect, useState } from "react";
import Loading from "../components/Loading"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productsSlice";

import { toggleLike } from "../redux/likeSlice";
import { Link } from "react-router-dom";

function Home() {
  
  const [search , setSearch]=useState("")
  const [debouncedSearch , setDebouncedSearch]=useState("")
  const dispatch =useDispatch()
  const [currentPage , setCurrentPage]=useState(1)
  const productPerPage = 6
  const [sortType , setSortType]=useState("")
  const {items , loading , error} =useSelector((state)=> state.products)
  const likeItems = useSelector((state)=> state.like.likedItems)
  


  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

  useEffect(()=>{
 const timer = setTimeout(()=>{
setDebouncedSearch(search)
 },500)
 return ()=> clearTimeout(timer)
  },[search])

  /** 2 */
  const filteredProducts=
  debouncedSearch ?
  items.filter((product)=>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
  : items


  useEffect(()=>{
    setCurrentPage(1)
  },[debouncedSearch])


 
  /** 3 */
const sortedProducts = [...filteredProducts]
if(sortType === "price-asc"){
  sortedProducts.sort((a ,b)=> a.price - b.price)
}
if(sortType === "price-desc"){
  sortedProducts.sort((a,b)=> b.price - a.price)
}
if(sortType === "A-Z"){
  sortedProducts.sort((a ,b)=> a.title.localeCompare(b.title))
}
if(sortType === "Z-A"){
  sortedProducts.sort((a,b)=> b.title.localeCompare(a.title))
}


 /** 4 */
const indexOfLastProduct = currentPage * productPerPage
  const indexOfFirstProduct = indexOfLastProduct - productPerPage

  const currentProducts =sortedProducts.slice(indexOfFirstProduct , indexOfLastProduct)

  const totalPage = Math.ceil(items.length / productPerPage )




  return (<>
<div>
      <input className="border border-gray-400 w-90 my-15 mx-5 px-3 py-1 rounded "
      placeholder="search"
      onChange={(e)=>setSearch(e.target.value)}
      />
     </div>
<div className=" mx-5 ">
     <select
     onChange={(e)=> setSortType(e.target.value)}
     className="border border-gray-400 rounded py-1 w-50 px-2">
      <option value="all">all</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
      <option value="price-asc">low to high</option>
      <option value="price-desc">high to low</option>
     </select>
</div>
    <div className="container p-2 m-auto h-100vh ">
      <div className=" grid grid-cols-1 sm:grid-cold-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">

{loading && <Loading />}
{error&& <p>{error.message}</p>}
     {currentProducts.map((product)=>(
      
        <div key={product.id} className="
        px-10 w-90 my-10 rounded ">
          <img className="h-80 px-9 my-3 rounded" src={product.thumbnail} alt="img" />
          <div className="my-5 px-9 py-2">
            <h1>{product.title}</h1>
            
            <p>{product.description}</p>
             <div><Link to={`/products/${product.id}`} className="text-indigo-700 ">Details</Link></div>
           <i
           onClick={()=>dispatch(toggleLike(product.id))}
           className={
            likeItems.includes(product.id)
            ? "bi bi-bookmark-heart"
            :"bi bi-bookmark-heart-fill"
           }
           />

           

            <div className="my-2 flex flex-row justify-between">
              <p className="font-bold">{product.price} $</p>
              
              <button
              onClick={()=> dispatch(addToCart(product))}
              className="border border-indigo-800 px-2 py-1 rounded bg-green-700 text-white transition hover:bg-green-500 cursor-pointer"
              >Add to cart</button>
            </div>
          </div>
        </div>
     ))}
        
       <div>
        <button
        className="cursor-pointer mx-2"
        disabled={currentPage ===1}
        onClick={()=>{
          if(currentPage >1){
            return setCurrentPage(currentPage-1)
          }
        }}
        >
          Prev
        </button>
        {Array.from({length:totalPage} , (_,index)=>{
          return(
            <button
            className={`border border-gray-600 px-2 mx-2 cursor-pointer rounded-lg ${currentPage ===index+1 ? "bg-indigo-500" : ""}`}
            key={index}
            onClick={()=>setCurrentPage(index+1)}
            >{index+1}</button>
          )
        })}
        <button
        className="cursor-pointer mx-2"
        disabled={currentPage ===totalPage}
        onClick={()=>{
          if(currentPage < totalPage){
            return setCurrentPage(currentPage+1)
          }
        }}
        >
          Next
        </button>
       </div>
 

         

      </div>
    </div>
    </>
  );
}

export default Home;
