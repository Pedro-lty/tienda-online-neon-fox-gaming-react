import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductsDetail';
import Login from './pages/Login'; // <-- Te faltaba esta importación




function App() {
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/products" element={<Products />} />
       <Route path="/products/:id" element={<ProductDetail />} />
       <Route path="/login" element={<Login />} />
     </Routes>
   </>
 );
}


export default App;
