import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

function App() {
  const user = true
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products/:category' element={<ProductList/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={user ? <Home/> : <Login/>}/>
          <Route path='/register' element={user ? <Home/> : <Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
