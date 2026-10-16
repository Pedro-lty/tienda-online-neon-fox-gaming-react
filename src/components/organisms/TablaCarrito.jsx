import React from 'react';
import Button from '../atoms/Button';
import FilaItemCarrito from '../molecules/FilaItemPedido';
import { useNavigate } from 'react-router-dom';

function TablaCarrito({ itemsCarrito, alActualizarCantidad, alEliminar, alLimpiar, totalPagar }) {
  const navigate = useNavigate();
  return (
    <div className="table-responsive bg-white rounded shadow-sm p-3">
      <table className="table align-middle text-center cart-table mb-3">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {itemsCarrito.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-muted py-4">
                El carrito está vacío.
              </td>
            </tr>
          ) : (
            itemsCarrito.map((item) => (
              <FilaItemCarrito
                key={item.id}
                item={item}
                alActualizarCantidad={alActualizarCantidad}
                alEliminar={alEliminar}
              />
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex flex-column align-items-end pt-2 border-top">
        <div className="fs-5 fw-bold mb-3">
          Total <span className="text-success ms-2">${totalPagar.toLocaleString('es-CL')}</span>
        </div>
        <div className="d-flex gap-2">
          <Button 
            className="btn btn-secondary px-4" 
            onClick={alLimpiar}
            disabled={itemsCarrito.length === 0}
          >
            Limpiar
          </Button>
          <Button 
            className="btn btn-success px-4 fw-bold"
            disabled={itemsCarrito.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Comprar ahora
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TablaCarrito;
