import React from 'react';

import Image from '../atoms/Image';

import Text from '../atoms/Text';

import Button from '../atoms/Button';

import { useNavigate } from 'react-router-dom';


function ProductCard({ product, alAgregarAlCarrito, hoverImage }) {

 const navigate = useNavigate();

 const [isImageHovered, setIsImageHovered] = React.useState(false);


 return (

  <div className="caja-item">

   <div

    className="periferico-img-container"

    onMouseEnter={() => setIsImageHovered(true)}

    onMouseLeave={() => setIsImageHovered(false)}

    onClick={() => navigate(`/products/${product.id}`)}

   >

    <Image

     src={isImageHovered && hoverImage ? hoverImage : product.image}

     alt={product.name}

     className="img-link"

    />

   </div>


   <Text className="marca">{product.brand || 'Marca'}</Text>

   <Text className="desc-corta">{product.name}</Text>

   <Text className="desc-corta fw-bold">

    PRECIO: ${product.price?.toLocaleString('es-CL')}

   </Text>


   <Button

    className="btn-agregar"

    onClick={() => alAgregarAlCarrito(product)}

   >

    Agregar al carrito

   </Button>

  </div>

 );

}


export default ProductCard;