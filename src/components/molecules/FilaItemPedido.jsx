import React from 'react';
import Button from '../atoms/Button';

function FilaItemCarrito({ item, alActualizarCantidad, alEliminar }) {
  return (
    <tr>
      <td>
        <img src={item.image} alt={item.name} className="cart-item-img" />
      </td>
      <td className="text-start fw-semibold fs-7" style={{ maxWidth: '150px' }}>
        {item.name}
      </td>
      <td>${item.price?.toLocaleString('es-CL')}</td>
      <td>
        <div className="d-flex align-items-center justify-content-center gap-1">
          <button 
            className="btn btn-outline-secondary btn-qty" 
            onClick={() => alActualizarCantidad(item.id, -1)}
          >
            -
          </button>
          <span className="fw-bold px-2">{item.quantity}</span>
          <button 
            className="btn btn-outline-secondary btn-qty" 
            onClick={() => alActualizarCantidad(item.id, 1)}
          >
            +
          </button>
        </div>
      </td>
      <td className="fw-bold">
        ${(item.price * item.quantity).toLocaleString('es-CL')}
      </td>
      <td>
        <Button 
          className="btn btn-danger btn-sm px-2 py-1 fs-7" 
          onClick={() => alEliminar(item.id)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
}

export default FilaItemCarrito;