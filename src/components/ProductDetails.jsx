
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"



function ProductDetails() {
const [product , setProduct]=useState(null)
const [loading , setLoading]=useState(false)
const [error , setError]=useState(null)
const {id} =useParams()


useEffect(()=>{
    const fetchData = async ()=>{
        try {
            setLoading(true)
            const res =await fetch(`https://dummyjson.com/products/${id}`)
            if(!res.ok) throw new Error("failed to fetch")
                const data=await res.json()
            
           setProduct(data)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    fetchData()
},[id])



  return (
     <div className="flex max-w-70 mx-auto py-20">
      <div>
        <div className="w-80 flex justify-center">
          {loading && <Loading />}
          {error && <p className=" text-rose-500">{error}</p>}
        </div>
        {!loading && product && (
          <>
            <img className=" w-70 h-70" src={product.thumbnail} alt="img" />
            <h1 className="my-2 text-purple-800">{product.title}</h1>
            <p className="text-sm mb-2">{product.description}</p>

            <div className="flex justify-between px-2">
              <p className="text-red-700">Price : {product.price}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails