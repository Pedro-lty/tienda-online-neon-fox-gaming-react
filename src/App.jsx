import React, { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductsDetail';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PurchaseResult from './pages/PurchaseResult';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contactos from './pages/Contactos';

function App() {
  // Estado global del carrito (inicia vacío)
  const [itemsCarrito, setItemsCarrito] = useState([]);

  // Agregar al carrito desde cualquier lugar
  const agregarAlCarrito = (producto) => {
    setItemsCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
  };

  // Modificar cantidad (+ / -)
  const actualizarCantidad = (id, delta) => {
    setItemsCarrito((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nuevaCantidad = item.quantity + delta;
          return nuevaCantidad > 0 ? { ...item, quantity: nuevaCantidad } : item;
        }
        return item;
      })
    );
  };

  // Eliminar producto individual
  const eliminarDelCarrito = (id) => {
    setItemsCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const limpiarCarrito = useCallback(() => {
    setItemsCarrito([]);
  }, []);

  // Cantidad total de items acumulados (para el botón/badge del Navbar)
  const totalItemsCount = itemsCarrito.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            alAgregarAlCarrito={agregarAlCarrito}
            totalItemsCount={totalItemsCount}
          />
        }
      />
      <Route
        path="/products"
        element={
          <Products
            alAgregarAlCarrito={agregarAlCarrito}
            totalItemsCount={totalItemsCount}
          />
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProductDetail
            alAgregarAlCarrito={agregarAlCarrito}
            totalItemsCount={totalItemsCount}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/nosotros"
        element={<Nosotros totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/blogs"
        element={<Blogs totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/contactos"
        element={<Contactos totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/carrito"
        element={
          <Carrito
            itemsCarrito={itemsCarrito}
            alAgregarAlCarrito={agregarAlCarrito}
            alActualizarCantidad={actualizarCantidad}
            alEliminar={eliminarDelCarrito}
            alLimpiar={limpiarCarrito}
            totalItemsCount={totalItemsCount}
          />
        }
      />
      <Route
        path="/checkout"
        element={
          <Checkout
            itemsCarrito={itemsCarrito}
            totalItemsCount={totalItemsCount}
          />
        }
      />
      <Route
        path="/compra/:estado"
        element={
          <PurchaseResult
            totalItemsCount={totalItemsCount}
            alLimpiar={limpiarCarrito}
          />
        }
      />
    </Routes>
  );
}

export default App;
