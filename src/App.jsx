import React, { useCallback, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductsDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PurchaseResult from './pages/PurchaseResult';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import { Caso1 } from './pages/Caso1';
import { Caso2 } from './pages/Caso2';
import Contactos from './pages/Contactos';
import RequireAdmin from './components/RequireAdmin';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import AdminOrdenes from './pages/AdminPages/AdminOrdenes';
import AdminProductos from './pages/AdminPages/AdminProductos';
import AdminNuevoProducto from './pages/AdminPages/AdminNuevoProducto';
import AdminEditarProducto from './pages/AdminPages/AdminEditarProducto';
import AdminMostrarProducto from './pages/AdminPages/AdminMostrarProducto';
import AdminListadoProductosCriticos from './pages/AdminPages/AdminListadoProductosCriticos';
import AdminCategorias from './pages/AdminPages/AdminCategorias';
import AdminNuevaCategoria from './pages/AdminPages/AdminNuevaCategoria';
import AdminEditarCategoria from './pages/AdminPages/AdminEditarCategoria';
import AdminUsuarios from './pages/AdminPages/AdminUsuarios';
import AdminNuevoUsuario from './pages/AdminPages/AdminNuevoUsuario';
import AdminEditarUsuario from './pages/AdminPages/AdminEditarUsuario';
import AdminMostrarUsuario from './pages/AdminPages/AdminMostrarUsuario';
import AdminHistorialCompras from './pages/AdminPages/AdminHistorialCompras';
import AdminMostrarBoleta from './pages/AdminPages/AdminMostrarBoleta';
import AdminReportes from './pages/AdminPages/AdminReportes';
import AdminPerfil from './pages/AdminPages/AdminPerfil';
import AdminBuscar from './pages/AdminPages/AdminBuscar';
import AdminAyuda from './pages/AdminPages/AdminAyuda';
import AdminConfiguracion from './pages/AdminPages/AdminConfiguracion';
import { getProducto } from './services/adminData';

function App() {
  const [itemsCarrito, setItemsCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    // No permite agregar más unidades de las que hay en stock
    const stock = getProducto(producto.id)?.stock ?? producto.stock ?? Infinity;
    const enCarrito = itemsCarrito.find((item) => item.id === producto.id)?.quantity ?? 0;
    if (enCarrito >= stock) {
      window.alert('No hay más stock disponible de este producto.');
      return;
    }

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

  const actualizarCantidad = (id, delta) => {
    if (delta > 0) {
      const stock = getProducto(id)?.stock ?? Infinity;
      const enCarrito = itemsCarrito.find((item) => item.id === id)?.quantity ?? 0;
      if (enCarrito + delta > stock) {
        window.alert('No hay más stock disponible de este producto.');
        return;
      }
    }

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

  const eliminarDelCarrito = (id) => {
    setItemsCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const limpiarCarrito = useCallback(() => {
    setItemsCarrito([]);
  }, []);

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
        path="/register"
        element={<Register totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/nosotros"
        element={<Nosotros totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/blogs"
        element={<Blogs totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/caso1"
        element={<Caso1 totalItemsCount={totalItemsCount} />}
      />
      <Route
        path="/caso2"
        element={<Caso2 totalItemsCount={totalItemsCount} />}
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

      {/* ---------- Panel de administración (solo rol Admin) ---------- */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        <Route path="/admin/ordenes/:codigo" element={<AdminMostrarBoleta />} />

        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/productos/nuevo" element={<AdminNuevoProducto />} />
        <Route path="/admin/productos/editar/:id" element={<AdminEditarProducto />} />
        <Route path="/admin/productos/:id" element={<AdminMostrarProducto />} />
        <Route path="/admin/productos-criticos" element={<AdminListadoProductosCriticos />} />

        <Route path="/admin/categorias" element={<AdminCategorias />} />
        <Route path="/admin/categorias/nueva" element={<AdminNuevaCategoria />} />
        <Route path="/admin/categorias/editar/:id" element={<AdminEditarCategoria />} />

        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/usuarios/nuevo" element={<AdminNuevoUsuario />} />
        <Route path="/admin/usuarios/editar/:id" element={<AdminEditarUsuario />} />
        <Route path="/admin/usuarios/:id" element={<AdminMostrarUsuario />} />
        <Route path="/admin/usuarios/:id/compras" element={<AdminHistorialCompras />} />

        <Route path="/admin/reportes" element={<AdminReportes />} />
        <Route path="/admin/perfil" element={<AdminPerfil />} />
        <Route path="/admin/buscar" element={<AdminBuscar />} />
        <Route path="/admin/ayuda" element={<AdminAyuda />} />
        <Route path="/admin/configuracion" element={<AdminConfiguracion />} />
      </Route>

      {/* Cualquier otra URL vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
