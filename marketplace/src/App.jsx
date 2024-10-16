import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Web from "./pages/Web";
import OwnedProducts from "./pages/Owned";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Web />} />
          <Route path="/products" element={<Products />} />
          <Route path="/mine" element={<OwnedProducts />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
