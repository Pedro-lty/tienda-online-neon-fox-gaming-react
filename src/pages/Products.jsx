import { Container, Row } from 'react-bootstrap';
import { products } from '../data/products.js';
import ProductCard from '../components/organisms/ProductCard';
import PlantillaBase from '../components/template/PlantillaBase';


function Products({ alAgregarAlCarrito, totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <Container className="my-5">
        <h1>Productos</h1>
        <Row>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              alAgregarAlCarrito={alAgregarAlCarrito}
            />
          ))}
        </Row>
      </Container>
    </PlantillaBase>
  );
}


export default Products;
