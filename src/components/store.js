
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../redux/cartSlice'
import authReducer from '../redux/authSlice'
import productsReducer from '../redux/productsSlice'
import likeReducer from '../redux/likeSlice'

export const store = configureStore({
  reducer: {
 cart: cartReducer,
 auth: authReducer,
 products : productsReducer,
 like :likeReducer
  },
})