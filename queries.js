var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:12345@localhost:5432/examen2';
var db = pgp(connectionString);


module.exports = {
  clientes: clientes,
  crearClientes: crearClientes,
  actualizarClientes: actualizarClientes,
  eliminarClientes: eliminarClientes,
  productos: productos,
  crearProductos: crearProductos,
  actualizarProductos: actualizarProductos,
  eliminarProductos: eliminarProductos,
  inventario: inventario,
  crearInventario: crearInventario,
  actualizarInventario: actualizarInventario,
  eliminarInventario: eliminarInventario,
  factura: factura,
  crearFactura: crearFactura,
  actualizarFactura: actualizarFactura,
  eliminarFactura: eliminarFactura
};
/**
 * Funciones para ver la información de cada uno de las tablas.
 */
function clientes(req, res, next) {
  db.any('select * from clientes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido todos los clientes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function productos(req, res, next) {
  db.any('select * from productos')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido todos los productos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function inventario(req, res, next) {
  db.any('select * from inventario')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido todo el inventario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function factura(req, res, next) {
  db.any('select * from Facturacion')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido toda la facturas'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
/**
 * Funciones para agregar la información de cada uno de las tablas.
 */
function crearClientes(req, res, next) {
  var cedula = req.body.cedula;
  var nombre = req.body.nombre;
  db.any("SELECT Transaccion_InsertarClientes('" + cedula + "','" + nombre + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se inserto un cliente'
        });
    })
    .catch(function (err) {
      res.status(500).json(err)
    });
}

function crearProductos(req, res, next) {
  var identificador = req.body.identificador;
  var nombre = req.body.nombre;
  var precio = parseInt(req.body.precio);
  var impuesto = req.body.impuesto;
  db.any("SELECT Transaccion_InsertarProductos('" + identificador + "','" + nombre + "','" + precio + "','" + impuesto + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se inserto un producto'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function crearInventario(req, res, next) {
  var identificador = parseInt(req.body.identificador);
  var producto = req.body.producto;
  var cantidad = req.body.cantidad;
  var cantidadMinima = req.body.cantidadMinima;
  var cantidadMaxima = req.body.cantidadMaxima;
  var gravado = req.body.gravado;
  db.any("SELECT Transaccion_InsertarInventario('" + identificador + "','" + producto + "','" + cantidad + "','" + cantidadMinima + "','" + cantidadMaxima + "','" + gravado + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se inserto en el inventario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function crearFactura(req, res, next) {
  var idFactura = parseInt(req.body.idFactura);
  var idCliente = req.body.idCliente;
  var fecha = req.body.fecha;
  var montoTotal = req.body.montoTotal;
  var subtotal = req.body.subtotal;
  var impuestos = req.body.impuestos;
  var nombreProducto = req.body.nombreProducto;
  var cantidadProducto = req.body.cantidadProducto;
  db.any("Select Transaccion_InsertarFacturacion ('" + idFactura + "','" + idCliente + "','" + fecha + "','" + montoTotal + "','" + subtotal + "','" + impuestos + "','" + nombreProducto + "','" + cantidadProducto + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se inserto datos en la factura'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
/**
 * Funciones para modificar la información de cada uno de las tablas.
 */
function actualizarClientes(req, res, next) {
  var cedula = req.body.cedula;
  var nombre = req.body.nombre;
  db.any("Select ModificarCliente ('" + cedula + "','" + nombre + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se actualizó datos del del cliente'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function actualizarProductos(req, res, next) {
  var identificador = req.body.identificador;
  var nombre = req.body.nombre;
  var precioP = parseInt(req.body.precioP);
  var impuesto = req.body.impuesto;
  db.any("Select ModificarProductos ('" + identificador + "','" + nombre + "','" + precioP + "','" + impuesto + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se actualizó datos de los productos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function actualizarInventario(req, res, next) {
  var identificador = parseInt(req.body.identificador);
  var producto = req.body.producto;
  var cantidad = req.body.cantidad;
  var cantidadMinima = req.body.cantidadMinima;
  var cantidadMaxima = req.body.cantidadMaxima;
  var gravado = req.body.gravado;
  console.log("Select ModificarInventario ('" + identificador + "','" + producto + "','" + cantidad + "','" + cantidadMinima + "','" + cantidadMaxima + "','" + gravado + "')");
  db.any("Select ModificarInventario ('" + identificador + "','" + producto + "','" + cantidad + "','" + cantidadMinima + "','" + cantidadMaxima + "','" + gravado + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se actualizó datos del inventario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function actualizarFactura(req, res, next) {
  var idFactura = parseInt(req.body.idFactura);
  var idCliente = req.body.idCliente;
  var fecha = req.body.fecha;
  var montoTotal = req.body.montoTotal;
  var subtotal = req.body.subtotal;
  var impuestos = req.body.impuestos;
  var nombreProducto = req.body.nombreProducto;
  var cantidadProducto = req.body.cantidadProducto;
  console.log("Select ModificarFacturacion ('" + idFactura + "','" + idCliente + "','" + fecha + "','" + montoTotal + "','" + subtotal + "','" + impuestos + "','" + nombreProducto + "','" + cantidadProducto + "')");
  db.any("Select ModificarInventario ('" + idFactura + "','" + idCliente + "','" + fecha + "','" + montoTotal + "','" + subtotal + "','" + impuestos + "','" + nombreProducto + "','" + cantidadProducto + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se actualizó datos de la factura'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
/**
 * Funciones para eliminar la información de cada uno de las tablas.
 */
function eliminarClientes(req, res, next) {
  var cedula = req.params.cedula;
  console.log(req);
  db.result("SELECT EliminarCliente ('" + cedula + "')")
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Eliminar factura ${result.rowCount}`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function eliminarProductos(req, res, next) {
  var identificador = req.params.identificador;
  console.log(req);
  db.result("SELECT EliminarProductos ('" + identificador + "')")
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Eliminar Producto ${result.rowCount}`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function eliminarInventario(req, res, next) {
  var identificador = parseInt(req.params.identificador);
  console.log(req);
  db.result("SELECT EliminarInventario ('" + identificador + "')")
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Eliminar Inventario ${result.rowCount}`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function eliminarFactura(req, res, next) {
  var idFactura = parseInt(req.params.idFactura);
  console.log(req);
  db.result("SELECT EliminarFacturacion ('" + idFactura + "')")
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Eliminar Inventario ${result.rowCount}`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}