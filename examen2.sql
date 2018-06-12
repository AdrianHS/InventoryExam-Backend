CREATE DOMAIN t_cedula
AS CHAR
(9) CHECK
(VALUE SIMILAR TO '[1-7][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]');

CREATE TABLE clientes
(
	cedula t_cedula,
	nombre VARCHAR(50),
	constraint PK_cedula_clientes primary key(cedula)
);

CREATE TABLE productos
(
	identificador VARCHAR(10),
	nombre VARCHAR(50),
	precio INT,
	impuesto INT,
	constraint PK_identificador_productos primary key(identificador)
);

CREATE TABLE inventario
(
	identificador INT,
	producto VARCHAR(50),
	cantidad VARCHAR(50),
	cantidadMinima VARCHAR(50),
	cantidadMaxima VARCHAR(50),
	gravado VARCHAR(50),
	constraint PK_identificador_inventario primary key(identificador)
);

CREATE TABLE Facturacion
(
	idFactura INT,
	idCliente VARCHAR(50) references clientes(cedula),
	fecha VARCHAR(50),
	montoTotal VARCHAR(50),
	subtotal VARCHAR(50),
	impuestos VARCHAR(50),
	nombreProducto VARCHAR(50),
	cantidadProducto VARCHAR(50),
	constraint PK_idFactura_idCliente_Facturacion primary key(idFactura,idCliente)
);

--------------------------------Procedimientos para Clientes-----------------------------------------
CREATE or replace function Transaccion_InsertarClientes
(cedula t_cedula, nombre VARCHAR
(50)) returns void
as
$$
begin
	INSERT INTO clientes
	VALUES
		(cedula, nombre);
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Error en la inserción: no se ha podido insertar en la tabla de clientes';
END
IF; 
end;
$$
language plpgsql;

SELECT Transaccion_InsertarClientes ('203210148','1e234');
select *
from clientes

--Procediminento de Modificar cliente
create or replace function ModificarCliente
(pcedula t_cedula, pnombre VARCHAR(50))returns void
as
$func$
begin
	update clientes set nombre = pnombre
    where cedula=pcedula;
end;
$func$ language plpgsql;

select ModificarCliente('203210147','Pacho')
--Procedimiento para eliminar un cliente 
create or replace function EliminarCliente
(pcedula t_cedula)returns void
as
$func$
begin
	delete from clientes where cedula = pcedula;

end;
$func$ language plpgsql;

select EliminarCliente('203210147');

--------------------------------Procedimientos de Productos---------------------------------------

create or replace function Transaccion_InsertarProductos
(identificador VARCHAR(10),nombre VARCHAR
(50),precio INT, impuesto INT) returns void
as
$$
begin
	INSERT INTO productos
	VALUES
		(identificador, nombre, precio, impuesto);
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Error en la inserción: no se ha podido insertar en la tabla de productos';
END
IF; 
end;
$$
language plpgsql;

SELECT Transaccion_InsertarProductos ('23','1e234',1500,2956);
select *
from productos
--Procedimiento para modificar producto
create or replace function ModificarProductos
(pidentificador VARCHAR(10),pnombre VARCHAR(50), pprecio INT, pimpuesto INT)returns void
as
$func$
begin
	update productos set nombre=pnombre, precio=pprecio, impuesto=pimpuesto
    where identificador=pidentificador;
end;
$func$ language plpgsql;

select ModificarProductos('23','Arroz',3000,5000);

--Procedimiento para eliminar un productos 
create or replace function EliminarProductos
(pidentificador VARCHAR(10))returns void
as
$func$
begin
	delete from productos where identificador = pidentificador;

end;
$func$ language plpgsql;

select EliminarProductos('23');
----------------------------- Procedimientos para inventario----------------------------
create or replace function Transaccion_InsertarInventario
(identificador	INT, producto VARCHAR
(50), cantidad VARCHAR
(50), cantidadMinima	VARCHAR
(50), cantidadMaxima	VARCHAR
(50), gravado VARCHAR
(50)) returns void
as
$$
begin
	INSERT INTO inventario
	VALUES
		(identificador, producto, cantidad, cantidadMinima, cantidadMaxima, gravado);
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Error en la inserción: no se ha podido insertar en la tabla de inventario';
END
IF; 
end;
$$
language plpgsql;

SELECT Transaccion_InsertarInventario (2655,'cafe','8','2','10','2956');
select *
from inventario
--Procedimiento para modificar inventario
create or replace function ModificarInventario
(pidentificador INT, pproducto VARCHAR
(50), pcantidad VARCHAR
(50), pcantidadMinima VARCHAR
(50),
	pcantidadMaxima	VARCHAR
(50), pgravado VARCHAR
(50))returns void
as
$func$
begin
	update inventario set producto=pproducto, cantidad=pcantidad, cantidadMinima=pcantidadMinima, cantidadMaxima=pcantidadMaxima, gravado=pgravado
    where identificador=pidentificador;
end;
$func$ language plpgsql;

select ModificarInventario(2655,'Café','30','4','50','1800');
--Procedimiento para eliminar un productos 
create or replace function EliminarInventario
(pidentificador INT)returns void
as
$func$
begin
	delete from inventario where identificador = pidentificador;

end;
$func$ language plpgsql;

select EliminarInventario(2655);

----------------------------- Procedimientos para Facturacion----------------------------
CREATE or replace function Transaccion_InsertarFacturacion
(idFactura INT, idCliente VARCHAR(50), fecha VARCHAR(50), montoTotal VARCHAR(50),
subtotal VARCHAR(50), impuestos VARCHAR(50), nombreProducto VARCHAR(50),cantidadProducto VARCHAR(50)) returns void
as
$$
begin
	INSERT INTO Facturacion
	VALUES
		(idFactura, idCliente, fecha, montoTotal, subtotal, impuestos, nombreProducto, cantidadProducto);
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Error en la inserción: no se ha podido insertar en la tabla de clientes';
END
IF; 
end;
$$
language plpgsql;

SELECT Transaccion_InsertarFacturacion (78,'203210147','hoy','55555','66666','777777','Arroz','9');
select *
from Facturacion

--Procediminento de Modificar Facturacion
create or replace function ModificarFacturacion
(pidFactura INT, pidCliente VARCHAR(50), pfecha VARCHAR(50), pmontoTotal VARCHAR(50),
psubtotal VARCHAR(50), pimpuestos VARCHAR(50), pnombreProducto VARCHAR(50),pcantidadProducto VARCHAR(50))returns void
as
$func$
begin
	update Facturacion set fecha=pfecha, montoTotal=pmontoTotal,subtotal=psubtotal, impuestos=pimpuestos, nombreProducto=pnombreProducto,cantidadProducto=pcantidadProducto
    where idFactura=pidFactura;
end;
$func$ language plpgsql;

select ModificarFacturacion(78,'203210147','manadsfdsf','556555','666866','7777707','Arroxzcxczz','9')
--Procedimiento para eliminar un Facturacion 
create or replace function EliminarFacturacion
(pidFactura INT)returns void
as
$func$
begin
	delete from Facturacion where idFactura = pidFactura;

end;
$func$ language plpgsql;

select EliminarFacturacion(78);
