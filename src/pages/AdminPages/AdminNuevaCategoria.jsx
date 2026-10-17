import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import CategoriaForm from '../../components/admin/CategoriaForm';
import { guardarCategoria } from '../../services/adminData';

const AdminNuevaCategoria = () => {
    const navigate = useNavigate();

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Nueva categoría" volverA="/admin/categorias" />
            <CategoriaForm
                textoBoton="Crear categoría"
                onSubmit={(datos) => {
                    const r = guardarCategoria(datos);
                    if (r.ok) navigate('/admin/categorias');
                    return r;
                }}
            />
        </PlantillaAdmin>
    );
};

export default AdminNuevaCategoria;
