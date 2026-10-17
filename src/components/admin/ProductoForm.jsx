import React, { useState } from 'react';
import { getCategorias } from '../../services/adminData';
import Campo from './Campo';

export default function ProductoForm({ inicial = {}, onSubmit, textoBoton = 'Guardar' }) {
  const categorias = getCategorias();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    categoria: categorias[0]?.nombre || '',
    price: '',
    stock: '',
    image: '',
    description: '',
    ...inicial
  });
  const [errores, setErrores] = useState({});

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
  };

  const enviar = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'El nombre es obligatorio.';
    if (!form.categoria) er.categoria = 'Selecciona una categoría.';
    if (form.price === '' || Number(form.price) < 0) er.price = 'Ingresa un precio válido.';
    if (
      form.stock === '' ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      er.stock = 'El stock debe ser un número entero (0 o más).';
    }
    if (Object.keys(er).length) {
      setErrores(er);
      return;
    }
    onSubmit({
      ...form,
      name: form.name.trim(),
      brand: form.brand.trim(),
      description: form.description.trim(),
      image: form.image.trim()
    });
  };

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="bg-white rounded shadow-sm p-4"
      style={{ maxWidth: 800 }}
    >
      <div className="row">
        <div className="col-md-8">
          <Campo label="Nombre del producto *" error={errores.name}>
            <input className="form-control" name="name" value={form.name} onChange={cambiar} />
          </Campo>
        </div>
        <div className="col-md-4">
          <Campo label="Marca">
            <input className="form-control" name="brand" value={form.brand} onChange={cambiar} />
          </Campo>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <Campo label="Categoría *" error={errores.categoria}>
            <select
              className="form-select"
              name="categoria"
              value={form.categoria}
              onChange={cambiar}
            >
              {categorias.map((c) => (
                <option key={c.id} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </Campo>
        </div>
        <div className="col-md-4">
          <Campo label="Precio (CLP) *" error={errores.price}>
            <input
              className="form-control"
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={cambiar}
            />
          </Campo>
        </div>
        <div className="col-md-4">
          <Campo label="Stock *" error={errores.stock}>
            <input
              className="form-control"
              type="number"
              min="0"
              name="stock"
              value={form.stock}
              onChange={cambiar}
            />
          </Campo>
        </div>
      </div>

      <Campo
        label="Imagen"
        ayuda="Ruta de una imagen que esté en la carpeta public, por ejemplo /teclado-redragon.webp"
      >
        <input className="form-control" name="image" value={form.image} onChange={cambiar} />
      </Campo>
      {form.image && (
        <img
          src={form.image}
          alt="Vista previa"
          className="mb-3"
          style={{ height: 90, objectFit: 'contain' }}
        />
      )}

      <Campo label="Descripción">
        <textarea
          className="form-control"
          rows="4"
          name="description"
          value={form.description}
          onChange={cambiar}
        />
      </Campo>

      <button type="submit" className="btn btn-primary">
        {textoBoton}
      </button>
    </form>
  );
}
