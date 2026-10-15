import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { products } from '../data/products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';


function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));


  if (!product) {
    return (
    <Container className="my-5">
      <h1>Producto no encontrado</h1>
    </Container>
  );
}


return (
  <Container className="my-5">
    <Card>
      <Image src={product.image} alt={product.name} className="card-img-top" />
      <Card.Body>
        <Text variant="h2">{product.name}</Text>
        <Text variant="p">{product.description}</Text>
        <Text variant="h4">${product.price}</Text>
      </Card.Body>
    </Card>
  </Container>
  );
}


export default ProductDetail;
