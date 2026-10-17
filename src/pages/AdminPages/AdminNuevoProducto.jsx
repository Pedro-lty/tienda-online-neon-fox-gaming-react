import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import ProductoForm from '../../components/admin/ProductoForm';
import { guardarProducto } from '../../services/adminData';

const AdminNuevoProducto = () => {
    const navigate = useNavigate();

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Nuevo producto" subtitulo="Se agregará al catálogo de la tienda." volverA="/admin/productos" />
            <ProductoForm
                textoBoton="Crear producto"
                onSubmit={(datos) => {
                    guardarProducto(datos);
                    navigate('/admin/productos');
                }}
            />
        </PlantillaAdmin>
    );
};

export default AdminNuevoProducto;
