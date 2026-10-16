import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';
import PaymentSimulation from '../components/organisms/PaymentSimulation';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/checkout/checkout.css';

const comunasPorRegion = {
  'Región de Arica y Parinacota': ['Arica', 'Putre'],
  'Región de Tarapacá': ['Iquique', 'Alto Hospicio'],
  'Región de Antofagasta': ['Antofagasta', 'Calama'],
  'Región de Atacama': ['Copiapó', 'Vallenar'],
  'Región de Coquimbo': ['La Serena', 'Coquimbo', 'Ovalle'],
  'Región Metropolitana de Santiago': ['Cerrillos', 'Cerro Navia', 'Conchalí', 'Independencia', 'La Florida', 'Las Condes', 'Maipú', 'Ñuñoa', 'Providencia', 'Puente Alto', 'Santiago'],
  'Región de O’Higgins': ['Rancagua', 'Machalí', 'San Fernando'],
  'Región del Maule': ['Talca', 'Curicó', 'Linares'],
  'Región de Ñuble': ['Chillán', 'San Carlos'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante'],
  'Región de La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica'],
  'Región de Los Ríos': ['Valdivia', 'La Unión'],
  'Región de Los Lagos': ['Puerto Montt', 'Osorno', 'Castro'],
  'Región de Aysén': ['Coyhaique', 'Aysén'],
  'Región de Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Puerto Natales'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio'],
};

const camposIniciales = {
  nombre: '',
  apellidos: '',
  correo: '',
  calle: '',
  departamento: '',
  region: '',
  comuna: '',
  indicaciones: '',
};

function validarCampo(campo, valor) {
  const texto = valor.trim();
  const nombreValido = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;
  const correoValido = /^[A-Z0-9_%+-]+(?:\.[A-Z0-9_%+-]+)*@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i;
  const calleValida = /^[\p{L}\p{N}]+(?:[\s.#-][\p{L}\p{N}]+)*$/u;

  if (['nombre', 'apellidos'].includes(campo)) {
    if (!texto) return 'Este campo es obligatorio.';
    if (!nombreValido.test(texto)) return 'Usa solo letras y espacios.';
  }
  if (campo === 'correo') {
    if (!texto) return 'El correo es obligatorio.';
    if (!correoValido.test(texto)) return 'Ingresa un correo válido, por ejemplo nombre@correo.cl.';
  }
  if (campo === 'calle') {
    if (!texto) return 'La calle y el número son obligatorios.';
    if (!calleValida.test(texto) || !/\p{N}/u.test(texto)) return 'Ingresa una dirección válida, incluyendo el número.';
  }
  if (campo === 'departamento' && texto && !/^[\p{L}\p{N} -]{1,20}$/u.test(texto)) {
    return 'Ingresa un departamento válido (máximo 20 caracteres).';
  }
  if (campo === 'region' && !texto) return 'Selecciona una región.';
  if (campo === 'comuna' && !texto) return 'Selecciona una comuna.';
  if (campo === 'indicaciones' && texto.length > 300) return 'Usa un máximo de 300 caracteres.';
  return '';
}

function Checkout({ itemsCarrito, totalItemsCount = 0 }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [campos, setCampos] = useState(() => ({ ...camposIniciales, ...location.state?.datosCheckout }));
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [mostrarSimulacion, setMostrarSimulacion] = useState(false);
  const totalPagar = itemsCarrito.reduce((suma, item) => suma + item.price * item.quantity, 0);

  if (itemsCarrito.length === 0) return <Navigate to="/carrito" replace />;

  const errores = Object.fromEntries(
    Object.entries(campos).map(([campo, valor]) => [campo, validarCampo(campo, valor)])
  );
  const formularioValido = Object.values(errores).every((error) => !error);

  const simularResultado = (estado) => {
    const pedido = {
      codigo: `NFG-${Date.now()}`,
      cliente: { ...campos },
      productos: itemsCarrito.map((item) => ({ ...item })),
      total: totalPagar,
      fecha: new Date().toLocaleDateString('es-CL'),
    };

    navigate(`/compra/${estado}`, { state: { pedido } });
  };

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setCampos((actuales) => ({
      ...actuales,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {}),
    }));
  };

  const campoTexto = (name, label, options = {}) => {
    const error = errores[name];
    const mostrarError = (tocados[name] || intentoEnvio) && error;
    return (
      <Form.Group className="checkout-field" controlId={`checkout-${name}`}>
        <Form.Label>{label}{options.required && <span aria-hidden="true">*</span>}</Form.Label>
        <Form.Control
          name={name}
          type={options.type || 'text'}
          value={campos[name]}
          onChange={actualizarCampo}
          onBlur={() => setTocados((actuales) => ({ ...actuales, [name]: true }))}
          required={options.required}
          maxLength={options.maxLength}
          as={options.as}
          rows={options.rows}
          placeholder={options.placeholder}
          isInvalid={Boolean(mostrarError)}
          aria-describedby={mostrarError ? `${name}-error` : undefined}
          autoComplete={options.autoComplete}
        />
        {mostrarError && <Form.Control.Feedback id={`${name}-error`} type="invalid">{error}</Form.Control.Feedback>}
      </Form.Group>
    );
  };

  const campoSeleccion = (name, label, opciones, disabled = false) => {
    const error = errores[name];
    const mostrarError = (tocados[name] || intentoEnvio) && error;
    return (
      <Form.Group className="checkout-field" controlId={`checkout-${name}`}>
        <Form.Label>{label}<span aria-hidden="true">*</span></Form.Label>
        <Form.Select
          name={name}
          value={campos[name]}
          onChange={actualizarCampo}
          onBlur={() => setTocados((actuales) => ({ ...actuales, [name]: true }))}
          required
          disabled={disabled}
          isInvalid={Boolean(mostrarError)}
        >
          <option value="">Selecciona {name === 'region' ? 'una región' : 'una comuna'}</option>
          {opciones.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
        </Form.Select>
        {mostrarError && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      </Form.Group>
    );
  };

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <Container className="checkout-page">
        <section className="checkout-card">
          <header className="checkout-heading">
            <div>
              <h1>Carrito de compra</h1>
              <p>Completa la siguiente información</p>
            </div>
            <div className="checkout-total">Total a pagar: <strong>${totalPagar.toLocaleString('es-CL')}</strong></div>
          </header>

          <div className="table-responsive checkout-summary">
            <table className="table align-middle mb-0">
              <thead><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
              <tbody>
                {itemsCarrito.map((item) => (
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

          <Form noValidate onSubmit={(evento) => {
            evento.preventDefault();
            setIntentoEnvio(true);
            if (formularioValido) setMostrarSimulacion(true);
          }}>
            <section className="checkout-section">
              <h2>Información del cliente</h2>
              <p>Completa la siguiente información</p>
              <div className="checkout-grid">
                {campoTexto('nombre', 'Nombre', { required: true, autoComplete: 'given-name' })}
                {campoTexto('apellidos', 'Apellidos', { required: true, autoComplete: 'family-name' })}
                {campoTexto('correo', 'Correo', { required: true, type: 'email', autoComplete: 'email' })}
              </div>
            </section>

            <section className="checkout-section">
              <h2>Dirección de entrega de los productos</h2>
              <p>Ingresa dirección de forma detallada</p>
              <div className="checkout-grid">
                {campoTexto('calle', 'Calle', { required: true, autoComplete: 'street-address', placeholder: 'Ej: Avenida Siempre Viva 123' })}
                {campoTexto('departamento', 'Departamento (opcional)', { placeholder: 'Ej: 603', maxLength: 20 })}
                {campoSeleccion('region', 'Región', Object.keys(comunasPorRegion))}
                {campoSeleccion('comuna', 'Comuna', comunasPorRegion[campos.region] || [], !campos.region)}
                <div className="checkout-grid-full">
                  {campoTexto('indicaciones', 'Indicaciones para la entrega (opcional)', { as: 'textarea', rows: 3, maxLength: 300, placeholder: 'Ej: Entre calles, color del edificio, no tiene timbre.' })}
                </div>
              </div>
            </section>

            <footer className="checkout-actions">
              <Button type="button" variant="outline-secondary" as={Link} to="/carrito">Volver al carrito</Button>
              <Button type="submit" className="btn btn-success" title="El pago estará disponible próximamente">
                Pagar ahora ${totalPagar.toLocaleString('es-CL')}
              </Button>
            </footer>
          </Form>
        </section>
      </Container>
      {mostrarSimulacion && (
        <PaymentSimulation
          onChoose={simularResultado}
          onClose={() => setMostrarSimulacion(false)}
        />
      )}
    </PlantillaBase>
  );
}

export default Checkout;
