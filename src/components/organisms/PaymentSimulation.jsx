import Button from '../atoms/Button';

function PaymentSimulation({ onChoose, onClose }) {
  return (
    <div className="payment-simulation-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="payment-simulation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-simulation-title"
      >
        <button className="payment-simulation-close" type="button" onClick={onClose} aria-label="Cerrar">×</button>
        <span className="payment-simulation-kicker">Modo de demostración</span>
        <h2 id="payment-simulation-title">Simular resultado del pago</h2>
        <p>Elige qué resultado quieres mostrar. No se realizará ningún cobro real.</p>
        <div className="payment-simulation-actions">
          <Button className="btn btn-success" onClick={() => onChoose('exito')}>
            Simular pago exitoso
          </Button>
          <Button className="btn btn-outline-danger" onClick={() => onChoose('fallido')}>
            Simular pago fallido
          </Button>
        </div>
      </section>
    </div>
  );
}

export default PaymentSimulation;
