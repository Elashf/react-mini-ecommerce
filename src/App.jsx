import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from './pages/Header'
import Login from"./components/Login"
import Cart from"./pages/Cart"
import PrivateRoute from "./components/privateRoute"
import ProductDetails from "./components/ProductDetails"

function App() {


  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/products/:id" element={<ProductDetails />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
