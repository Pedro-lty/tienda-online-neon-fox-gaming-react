import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getProductos } from '../services/adminData';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/home.css';

function ProductDetail({ alAgregarAlCarrito, totalItemsCount = 0 }) {
  const { id } = useParams();
  const product = getProductos().find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <PlantillaBase totalItemsCount={totalItemsCount}>
        <div className="main-container">
          <Container className="py-5 text-center">
            <h1>Producto no encontrado</h1>
            <Button as={Link} to="/products" className="btn-iniciar-sesion mt-3">
              Volver a productos
            </Button>
          </Container>
        </div>
      </PlantillaBase>
    );
  }

  const sinStock = product.stock <= 0;

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="main-container">
        <Container className="py-5">
          <Button as={Link} to="/products" className="btn-iniciar-sesion mb-3">
            ← Volver a productos
          </Button>

          <Card style={{ border: '3px solid #934bbd', borderRadius: '12px' }}>
            <Card.Body>
              <Row className="align-items-center g-4">
                <Col md={5} className="text-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                  />
                </Col>

                <Col md={7}>
                  <Text variant="span" className="text-muted">{product.brand}</Text>
                  <Text variant="h2">{product.name}</Text>
                  <Text variant="h3" className="my-3">
                    ${product.price.toLocaleString('es-CL')}
                  </Text>
                  <Text variant="p">{product.description}</Text>

                  {alAgregarAlCarrito && (
                    <Button
                      className="btn-iniciar-sesion mt-2"
                      disabled={sinStock}
                      onClick={() => alAgregarAlCarrito(product)}
                    >
                      {sinStock ? 'Sin stock' : 'Agregar al carrito'}
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </PlantillaBase>
  );
}

export default ProductDetail;
