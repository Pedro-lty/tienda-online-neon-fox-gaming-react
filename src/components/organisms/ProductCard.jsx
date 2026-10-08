import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="caja-item">
      <div 
        className="periferico-img-container" 
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <Image src={product.image} alt={product.name} className="img-link" />
      </div>

      <Text className="marca">{product.brand || 'Marca'}</Text>
      <Text className="desc-corta">{product.name}</Text>
      <Text className="desc-corta fw-bold">
        PRECIO: ${product.price?.toLocaleString('es-CL')}
      </Text>

      <Button className="btn-agregar">
        Agregar al carrito
      </Button>
    </div>
  );
}

export default ProductCard;