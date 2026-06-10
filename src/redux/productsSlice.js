import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from "../services/api"


export const fetchProducts = createAsyncThunk("products/fetchProducts",
    async() => {
        const data = await getProducts()
        return data 
    }
)

const initialState = {
  items:[],
  loading:false ,
  error:null
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchProducts.pending , (state)=>{
        state.loading= true
        state.error =null
    })
    .addCase(fetchProducts.fulfilled() , (state , action)=>{
        state.loading = false
        state.items = action.payload.products
        
        
    })
    .addCase(fetchProducts.rejected() , (state)=>{
        state.loading=false
        state.error = "failed to fetch"
    })
  }
})



export default productsSlice.reducer