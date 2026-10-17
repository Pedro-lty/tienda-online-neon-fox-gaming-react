import React, { useState } from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import Campo from '../../components/admin/Campo';
import { getSesion, getUsuario, guardarUsuario } from '../../services/adminData';

const AdminPerfil = () => {
    const sesion = getSesion();
    const usuario = sesion ? getUsuario(sesion.email) : null;

    const [form, setForm] = useState({
        nombre: usuario?.nombre || '',
        apellido: usuario?.apellido || '',
        telefono: usuario?.telefono || '',
        passwordActual: '',
        passwordNueva: ''
    });
    const [error, setError] = useState('');
    const [ok, setOk] = useState(false);

    if (!usuario) {
        return (
            <PlantillaAdmin>
                <EncabezadoAdmin titulo="Mi perfil" />
                <p>No se encontró tu cuenta. Vuelve a iniciar sesión.</p>
            </PlantillaAdmin>
        );
    }

    const cambiar = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');
        setOk(false);
    };

    const guardar = (e) => {
        e.preventDefault();
        if (!form.nombre.trim()) return setError('El nombre es obligatorio.');

        if (form.passwordNueva) {
            if (form.passwordActual !== usuario.password) return setError('La contraseña actual no es correcta.');
            if (form.passwordNueva.length < 8) return setError('La nueva contraseña debe tener al menos 8 caracteres.');
        }

        const r = guardarUsuario(
            {
                ...usuario,
                nombre: form.nombre.trim(),
                apellido: form.apellido.trim(),
                telefono: form.telefono.trim(),
                password: form.passwordNueva // vacío = se mantiene la actual
            },
            usuario.email
        );
        if (!r.ok) return setError(r.error);

        // Actualiza el nombre que se muestra en la sesión
        localStorage.setItem('user', JSON.stringify({ ...sesion, nombre: form.nombre.trim() }));
        setForm((prev) => ({ ...prev, passwordActual: '', passwordNueva: '' }));
        setOk(true);
    };

    return (
        <PlantillaAdmin>
            <EncabezadoAdmin titulo="Mi perfil" subtitulo={usuario.email} />

            <form onSubmit={guardar} noValidate className="bg-white rounded shadow-sm p-4" style={{ maxWidth: 600 }}>
                <div className="row">
                    <div className="col-md-6">
                        <Campo label="Nombre *">
                            <input className="form-control" name="nombre" value={form.nombre} onChange={cambiar} />
                        </Campo>
                    </div>
                    <div className="col-md-6">
                        <Campo label="Apellido">
                            <input className="form-control" name="apellido" value={form.apellido} onChange={cambiar} />
                        </Campo>
                    </div>
                </div>
                <Campo label="Teléfono">
                    <input className="form-control" name="telefono" value={form.telefono} onChange={cambiar} />
                </Campo>

                <hr />
                <h2 className="h6">Cambiar contraseña</h2>
                <p className="text-muted small">Déjalo en blanco si no quieres cambiarla.</p>
                <div className="row">
                    <div className="col-md-6">
                        <Campo label="Contraseña actual">
                            <input className="form-control" type="password" name="passwordActual" value={form.passwordActual} onChange={cambiar} autoComplete="current-password" />
                        </Campo>
                    </div>
                    <div className="col-md-6">
                        <Campo label="Nueva contraseña">
                            <input className="form-control" type="password" name="passwordNueva" value={form.passwordNueva} onChange={cambiar} autoComplete="new-password" />
                        </Campo>
                    </div>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {ok && <div className="alert alert-success py-2">Cambios guardados.</div>}
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        </PlantillaAdmin>
    );
};

export default AdminPerfil;
