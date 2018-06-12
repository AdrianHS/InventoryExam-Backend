var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Examen2'
  });
});

router.get('/clientes', db.clientes);
router.post('/crearClientes', db.crearClientes);
router.put('/actualizarClientes/:cedula', db.actualizarClientes);
router.delete('/eliminarClientes/:cedula', db.eliminarClientes);
router.get('/productos', db.productos);
router.post('/crearProductos', db.crearProductos);
router.put('/actualizarProductos/:identificador', db.actualizarProductos);
router.delete('/eliminarProductos/:identificador', db.eliminarProductos);
router.get('/inventario', db.inventario);
router.post('/crearInventario', db.crearInventario);
router.put('/actualizarInventario/:identificador', db.actualizarInventario);
router.delete('/eliminarInventario/:identificador', db.eliminarInventario);
router.get('/factura', db.factura);
router.post('/crearFactura', db.crearFactura);
router.put('/actualizarFactura/:idFactura', db.actualizarFactura);
router.delete('/eliminarFactura/:idFactura', db.eliminarFactura);
module.exports = router;