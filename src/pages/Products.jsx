import { getProductos } from '../services/adminData';
import ProductCard from '../components/organisms/ProductCard';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/home.css';

function Products({ alAgregarAlCarrito, totalItemsCount = 0 }) {
  const products = getProductos();

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="main-container">
        <div className="text-destacados">
          <h2>PRODUCTOS</h2>
        </div>

        <div className="contenedor-caja">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              hoverImage={product.images?.[1]}
              alAgregarAlCarrito={alAgregarAlCarrito}
            />
          ))}
        </div>
      </div>
    </PlantillaBase>
  );
}

export default Products;
