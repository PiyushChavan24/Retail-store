/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Items from "./pages/Items";
import CartPage from "./pages/CartPage";
function App() {
 return (
  <div className="App">
   <BrowserRouter>
    <Routes>
     <Route path="/home" element={<HomePage />} />
     <Route path="/items" element={<Items />} />
     <Route path="/cart" element={<CartPage />} />
    </Routes>
   </BrowserRouter>
  </div>
 );
}

export default App;
