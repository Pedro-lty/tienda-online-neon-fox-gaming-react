import React from 'react';
import PlantillaBase from '../components/template/PlantillaBase';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';
import TablaCarrito from '../components/organisms/TablaCarrito';
import { getProductos } from '../services/adminData';
import '../styles/pages/carrito.css';

function Carrito({
  itemsCarrito,
  alAgregarAlCarrito,
  alActualizarCantidad,
  alEliminar,
  alLimpiar,
  totalItemsCount,
}) {
  const products = getProductos();

  const totalPagar = itemsCarrito.reduce(
    (suma, item) => suma + item.price * item.quantity,
    0
  );

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="container py-4">
        <div className="row mt-4">
          <div className="col-lg-5 col-md-12 mb-4">
            <h3 className="fw-bold mb-3 text-start">Lista de productos</h3>
            <div className="row g-3">
              {products.map((producto) => (
                <div key={producto.id} className="col-6 col-sm-6">
                  <div className="card product-card-sm text-center h-100 p-2 shadow-sm">
                    <div className="img-placeholder mb-2">
                      <Image src={producto.image} alt={producto.name} className="img-fluid style-cart-img" />
                    </div>
                    <Text className="fw-bold fs-7 text-truncate">{producto.name}</Text>
                    <Text className="text-muted small">{producto.brand || 'Marca'}</Text>
                    <Text className="fw-bold text-warning fs-6 my-1">
                      ${producto.price?.toLocaleString('es-CL')}
                    </Text>
                    <Button
                      className="btn btn-dark btn-sm mt-auto"
                      disabled={producto.stock <= 0}
                      onClick={() => alAgregarAlCarrito(producto)}
                    >
                      {producto.stock <= 0 ? 'Sin stock' : 'Añadir'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7 col-md-12">
            <h3 className="fw-bold mb-3 text-start">Carrito de Compras</h3>
            <TablaCarrito
              itemsCarrito={itemsCarrito}
              alActualizarCantidad={alActualizarCantidad}
              alEliminar={alEliminar}
              alLimpiar={alLimpiar}
              totalPagar={totalPagar}
            />
          </div>
        </div>
      </div>
    </PlantillaBase>
  );
}

export default Carrito;
