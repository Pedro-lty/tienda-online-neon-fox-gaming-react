import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';
import PlantillaBase from '../components/template/PlantillaBase';
import { guardarOrden } from '../services/adminData';
import "../styles/pages/checkout.css";

function PurchaseResult({ totalItemsCount = 0, alLimpiar }) {
  const { estado } = useParams();
  const location = useLocation();
  const pedido = location.state?.pedido;
  const compraExitosa = estado === 'exito';

  useEffect(() => {
    if (pedido && compraExitosa) {
      guardarOrden(pedido); // queda registrada en el admin y descuenta stock
      alLimpiar();
    }
  }, [pedido, compraExitosa, alLimpiar]);

  if (!pedido || !['exito', 'fallido'].includes(estado)) {
    return <Navigate to="/carrito" replace />;
  }

  const cliente = pedido.cliente;

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <Container className="checkout-page">
        <section className="checkout-card purchase-result-card">
          <header className="purchase-result-heading">
            <div className={`purchase-result-icon ${compraExitosa ? 'is-success' : 'is-failed'}`} aria-hidden="true">
              {compraExitosa ? '✓' : '×'}
            </div>
            <div>
              <h1>{compraExitosa ? 'Se ha realizado la compra' : 'No se pudo realizar el pago'}</h1>
              <p>{compraExitosa ? 'Gracias por tu compra. Aquí está el resumen de tu pedido.' : 'No se realizó ningún cobro. Puedes revisar los datos e intentarlo nuevamente.'}</p>
            </div>
            <div className="purchase-order-code">Orden <strong>#{pedido.codigo}</strong><small>{pedido.fecha}</small></div>
          </header>

          <section className="checkout-section purchase-customer-section">
            <h2>Información del cliente</h2>
            <div className="checkout-grid">
              <ReadOnlyField label="Nombre" value={cliente.nombre} />
              <ReadOnlyField label="Apellidos" value={cliente.apellidos} />
              <ReadOnlyField label="Correo" value={cliente.correo} />
            </div>
          </section>

          <section className="checkout-section">
            <h2>Dirección de entrega de los productos</h2>
            <div className="checkout-grid">
              <ReadOnlyField label="Calle" value={cliente.calle} />
              <ReadOnlyField label="Departamento" value={cliente.departamento || 'No informado'} />
              <ReadOnlyField label="Región" value={cliente.region} />
              <ReadOnlyField label="Comuna" value={cliente.comuna} />
              <div className="checkout-grid-full">
                <ReadOnlyField label="Indicaciones para la entrega" value={cliente.indicaciones || 'Sin indicaciones'} />
              </div>
            </div>
          </section>

          <div className="table-responsive checkout-summary purchase-summary">
            <table className="table align-middle mb-0">
              <thead><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
              <tbody>
                {pedido.productos.map((item) => (
                  <tr key={item.id}>
                    <td><Image src={item.image} alt={item.name} className="checkout-product-image" /></td>
                    <td>{item.name}</td>
                    <td>${item.price.toLocaleString('es-CL')}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="purchase-paid-total">
            <span>{compraExitosa ? 'Total pagado' : 'Total de la compra'}</span>
            <strong>${pedido.total.toLocaleString('es-CL')}</strong>
          </div>

          <footer className="purchase-result-actions">
            {compraExitosa ? (
              <Button as={Link} to="/" className="btn btn-primary">Volver al inicio</Button>
            ) : (
              <Button as={Link} to="/checkout" state={{ datosCheckout: cliente }} className="btn btn-success">
                Volver a realizar el pago
              </Button>
            )}
          </footer>
        </section>
      </Container>
    </PlantillaBase>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div className="purchase-readonly-field">
      <span>{label}</span>
      <div>{value}</div>
    </div>
  );
}

export default PurchaseResult;
