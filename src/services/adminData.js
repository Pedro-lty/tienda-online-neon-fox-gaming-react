// Capa de datos del proyecto (todo se guarda en localStorage del navegador).
// Las páginas del admin Y las de la tienda leen/escriben desde aquí.
import { products as productosBase } from '../data/products.js';

export const STOCK_CRITICO = 5;
export const ESTADOS_ORDEN = ['Pagada', 'Enviada', 'Entregada', 'Cancelada'];

const KEYS = {
  productos: 'productos',
  categorias: 'categorias',
  usuarios: 'usuarios',
  ordenes: 'ordenes'
};

const leer = (clave, defecto) => {
  try {
    const valor = JSON.parse(localStorage.getItem(clave));
    return valor ?? defecto;
  } catch {
    return defecto;
  }
};
const guardar = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));
const siguienteId = (lista) =>
  lista.reduce((max, x) => Math.max(max, Number(x.id) || 0), 0) + 1;
const igual = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();

export const clp = (n) => '$' + Number(n || 0).toLocaleString('es-CL');

export const getSesion = () => leer('user', null);

/* ------------------------------ PRODUCTOS ------------------------------ */

const categoriaDe = (nombre = '') => {
  const t = nombre.toLowerCase();
  if (/aud[ií]fonos/.test(t)) return 'Audio';
  if (/mouse ?pad/.test(t)) return 'Mousepads';
  if (/mouse/.test(t)) return 'Mouses';
  if (/teclado/.test(t)) return 'Teclados';
  return 'Otros';
};

export function getProductos() {
  let lista = leer(KEYS.productos, null);
  if (!Array.isArray(lista)) {
    lista = productosBase.map((p) => ({ ...p, stock: 10, categoria: categoriaDe(p.name) }));
    guardar(KEYS.productos, lista);
  }
  return lista;
}

export const getProducto = (id) => getProductos().find((p) => String(p.id) === String(id));

export function guardarProducto(prod) {
  const lista = getProductos();
  const data = { ...prod, price: Number(prod.price), stock: Number(prod.stock) };

  if (data.id) {
    guardar(
      KEYS.productos,
      lista.map((p) =>
        String(p.id) === String(data.id)
          ? {
              ...p,
              ...data,
              images: [data.image, ...(p.images || []).slice(1)].filter(Boolean)
            }
          : p
      )
    );
  } else {
    guardar(KEYS.productos, [
      ...lista,
      { ...data, id: siguienteId(lista), images: data.image ? [data.image] : [] }
    ]);
  }
}

export function eliminarProducto(id) {
  guardar(KEYS.productos, getProductos().filter((p) => String(p.id) !== String(id)));
}

/* ----------------------------- CATEGORÍAS ------------------------------ */

export function getCategorias() {
  let lista = leer(KEYS.categorias, null);
  if (!Array.isArray(lista)) {
    const nombres = [...new Set(getProductos().map((p) => p.categoria))];
    lista = nombres.map((nombre, i) => ({ id: i + 1, nombre, descripcion: '' }));
    guardar(KEYS.categorias, lista);
  }
  return lista;
}

export const getCategoria = (id) => getCategorias().find((c) => String(c.id) === String(id));

export function guardarCategoria(cat) {
  const lista = getCategorias();
  const nombre = cat.nombre.trim();
  const repetida = lista.some(
    (c) => igual(c.nombre, nombre) && String(c.id) !== String(cat.id)
  );
  if (repetida) return { ok: false, error: 'Ya existe una categoría con ese nombre.' };

  if (cat.id) {
    const anterior = lista.find((c) => String(c.id) === String(cat.id));
    guardar(
      KEYS.categorias,
      lista.map((c) =>
        String(c.id) === String(cat.id)
          ? { ...c, nombre, descripcion: cat.descripcion || '' }
          : c
      )
    );
    // Si cambió el nombre, actualiza los productos que la usaban
    if (anterior && anterior.nombre !== nombre) {
      guardar(
        KEYS.productos,
        getProductos().map((p) =>
          p.categoria === anterior.nombre ? { ...p, categoria: nombre } : p
        )
      );
    }
  } else {
    guardar(KEYS.categorias, [
      ...lista,
      { id: siguienteId(lista), nombre, descripcion: cat.descripcion || '' }
    ]);
  }
  return { ok: true };
}

export function eliminarCategoria(id) {
  const cat = getCategoria(id);
  if (!cat) return { ok: false, error: 'La categoría no existe.' };
  const enUso = getProductos().filter((p) => p.categoria === cat.nombre).length;
  if (enUso > 0) {
    return {
      ok: false,
      error: `No se puede eliminar: ${enUso} producto(s) usan esta categoría.`
    };
  }
  guardar(KEYS.categorias, getCategorias().filter((c) => String(c.id) !== String(id)));
  return { ok: true };
}

/* ------------------------------ USUARIOS ------------------------------- */

export const getUsuarios = () => leer(KEYS.usuarios, []);

export const getUsuario = (email) =>
  getUsuarios().find((u) => u.email && igual(u.email, email));

// emailOriginal: si viene, se edita ese usuario; si no, se crea uno nuevo
export function guardarUsuario(datos, emailOriginal) {
  const lista = getUsuarios();
  const email = datos.email.trim();
  const duplicado = lista.some(
    (u) =>
      u.email &&
      igual(u.email, email) &&
      !(emailOriginal && igual(u.email, emailOriginal))
  );
  if (duplicado) return { ok: false, error: 'Ya existe un usuario con ese correo.' };

  if (emailOriginal) {
    guardar(
      KEYS.usuarios,
      lista.map((u) => {
        if (!(u.email && igual(u.email, emailOriginal))) return u;
        const actualizado = { ...u, ...datos, email };
        if (!datos.password) actualizado.password = u.password; // vacío = no cambiar
        return actualizado;
      })
    );
  } else {
    guardar(KEYS.usuarios, [...lista, { ...datos, email }]);
  }
  return { ok: true };
}

export function eliminarUsuario(email) {
  const sesion = getSesion();
  if (sesion && igual(sesion.email, email)) {
    return { ok: false, error: 'No puedes eliminar tu propia cuenta mientras estás conectado.' };
  }
  guardar(
    KEYS.usuarios,
    getUsuarios().filter((u) => !(u.email && igual(u.email, email)))
  );
  return { ok: true };
}

/* ------------------------------- ÓRDENES ------------------------------- */

export const getOrdenes = () => leer(KEYS.ordenes, []);

export const getOrden = (codigo) =>
  getOrdenes().find((o) => String(o.codigo) === String(codigo));

export const comprasDeUsuario = (email) =>
  getOrdenes().filter((o) => o.cliente?.correo && igual(o.cliente.correo, email));

// Se llama desde PurchaseResult cuando la compra es exitosa.
// Si el código ya existe no hace nada (evita duplicados al recargar).
export function guardarOrden(pedido) {
  const lista = getOrdenes();
  if (lista.some((o) => String(o.codigo) === String(pedido.codigo))) return;

  guardar(KEYS.ordenes, [{ ...pedido, estado: 'Pagada' }, ...lista]);

  // Descuenta el stock de lo comprado
  guardar(
    KEYS.productos,
    getProductos().map((p) => {
      const item = pedido.productos.find((i) => String(i.id) === String(p.id));
      return item ? { ...p, stock: Math.max(0, (p.stock ?? 0) - item.quantity) } : p;
    })
  );
}

export function cambiarEstadoOrden(codigo, estado) {
  guardar(
    KEYS.ordenes,
    getOrdenes().map((o) => (String(o.codigo) === String(codigo) ? { ...o, estado } : o))
  );
}
