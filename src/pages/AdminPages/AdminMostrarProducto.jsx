import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminMostrarProducto = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <div>
                    <p className="saludo">Productos</p>
                    <h1>Detalle de producto</h1>
                </div>
                <a className="boton secundario" href="/admin/productos">Volver</a>
            </div>
            <section className="formulario detalle">
                <p><strong>Código:</strong> 001</p>
                <p><strong>Nombre:</strong> Teclado</p>
                <p><strong>Categoría:</strong> Periféricos</p>
                <p><strong>Precio:</strong> $49.990</p>
                <p><strong>Stock:</strong> 10 unidades</p>
                <p><strong>Descripción:</strong> Teclado ....</p>
                <a className="boton" href="/admin/editar-producto">Editar producto</a>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminMostrarProducto;