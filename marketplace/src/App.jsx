import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Web from "./pages/Web";
import OwnedProducts from "./pages/Owned";
import "react-toastify/dist/ReactToastify.css";


function App() {
  
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Web />}> </Route>
        <Route  path="/products" element={<Products />} />
        <Route path="/mine" element={<OwnedProducts/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App
