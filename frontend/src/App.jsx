import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/About.jsx";
import Cart from "./Pages/Cart.jsx";
import Home from "./Pages/Home.jsx";
import Orders from "./Pages/Orders.jsx";
import Products from "./Pages/Products.jsx";
import ListSelectedProducts from "./Section/ListSelectedProducts.jsx";
import MainSearch from "./Section/MainSearch";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Product from "./Pages/Product.jsx";
import LoginSignUp from "./Pages/LoginSignUp.jsx";
import CategorySection from "./Section/CategorySection.jsx";
import CategoryPage from "./Pages/CategoryPage.jsx";
import LikedPage from "./Pages/LikedPage.jsx";
const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/allproducts" element={<Products />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path={"/login"} element={<LoginSignUp/>}/>
          <Route path={"/signup"} element={<LoginSignUp/>}/>
          <Route path={"/category"} element={<CategoryPage/>}/>
          <Route path={"/whishlist"} element={<LikedPage/>}/>
        </Routes>

       <div id="contact"> <Footer /></div>
      </BrowserRouter>
    </div>
  );
};

export default App;
