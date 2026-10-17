import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import ProductoForm from '../../components/admin/ProductoForm';
import { getProducto, guardarProducto } from '../../services/adminData';

const AdminEditarProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const producto = getProducto(id);

    if (!producto) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Producto no encontrado" volverA="/admin/productos" />
                <p>El producto que buscas no existe o fue eliminado.</p>
            </PlantillaAdmin>
        );
    }

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Editar producto" subtitulo={producto.name} volverA="/admin/productos" />
            <ProductoForm
                inicial={producto}
                textoBoton="Guardar cambios"
                onSubmit={(datos) => {
                    guardarProducto({ ...datos, id: producto.id });
                    navigate('/admin/productos');
                }}
            />
        </PlantillaAdmin>
    );
};

export default AdminEditarProducto;
