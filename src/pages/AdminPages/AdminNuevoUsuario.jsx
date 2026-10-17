import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import UsuarioForm from '../../components/admin/UsuarioForm';
import { guardarUsuario } from '../../services/adminData';

const AdminNuevoUsuario = () => {
    const navigate = useNavigate();

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Nuevo usuario" subtitulo="Registra un administrador o un cliente." volverA="/admin/usuarios" />
            <UsuarioForm
                esNuevo
                textoBoton="Crear usuario"
                onSubmit={(datos) => {
                    const r = guardarUsuario(datos);
                    if (r.ok) navigate('/admin/usuarios');
                    return r;
                }}
            />
        </PlantillaAdmin>
    );
};

export default AdminNuevoUsuario;
