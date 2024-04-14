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
import Test from "./components/Test.jsx";
import naruto from "./assets/naruto.png";
import dragonballz from "./assets/dragonballz.png"
import onepiece from "./assets/onepiece.png"
import demonslayer from "./assets/demonslayer.png"
import aot from "./assets/aot.png"
import {Toaster} from "react-hot-toast"
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
          <Route path={"/form"} element={<Test/>}/>
          <Route
            path="/naruto"
            element={
              <CategoryPage
                name="NARUTO"
                tag="naruto"
                img={naruto}
                desc="Naruto is a Japanese manga series written and illustrated by
                Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young
                ninja who seeks recognition from his peers and dreams of
                becoming the Hokage, the leader of his village."
              />
            }
          />
          <Route
            path="/onepiece"
            element={
              <CategoryPage
                name="ONE PEICE"
                tag="onepiece"
                img={onepiece}
                desc="Premise. The series focuses on Monkey D. Luffy—a young man made of rubber after unintentionally eating a Devil Fruit—who sets off on a journey from the East Blue Sea to find the deceased King of the Pirates Gol D. Roger's ultimate treasure known as the One Piece, and take over his prior title.."
              />
            }
          />
          <Route
            path="/demonslayer"
            element={
              <CategoryPage
                name="DEMON SLAYER"
                img={demonslayer}
                tag="demonslayer"
                desc="A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister."
              />
            }
          />
          <Route
            path="/aot"
            element={
              <CategoryPage
                name="ATTACK ON TITAN"
                img={aot}
                tag="aot"
                desc="A teenage boy named Eren Jaeger must use his special gift to fight alongside with the military to defeat the titan race. Mankind is on the brink of extinction when these man-eating monsters terrorize everybody and set to destroy the last of human civilization left in the world."
              />
            }
          />
          <Route
            path="/dragonballz"
            element={
              <CategoryPage
                name="DRADONBALL Z"
                img={dragonballz}
                tag="dragonballz"
                desc="Dragon Ball Z follows the adventures of Goku who, along with the Z Warriors, defends the Earth against evil. The action adventures are entertaining and reinforce the concept of good versus evil. Dragon Ball Z teaches valuable character virtues such as teamwork, loyalty, and trustworthiness.."
              />
            }
          />
        </Routes>
        <Toaster />
       <div id="contact"> <Footer /></div>
      </BrowserRouter>
    </div>
  );
};

export default App;
