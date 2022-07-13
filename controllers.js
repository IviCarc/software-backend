const productos = require("./productos-test.js");
const mongoose = require('mongoose');

const {Producto, Categoria} = require('./models.js');

const controller = {}

controller.getAllProducts = async (req, res) => {
    res.send(productos);
}

controller.todosProductos = async (req, res) => {
    const todosProductos = await Producto.find();
    res.send(todosProductos)
}

controller.todasCategorias = async (req, res) => {
    const todasCategorias = await Categoria.find();
    res.send(todasCategorias);
}

// getAllProducts es la prueba que utiliza la página

// Por ahora, el producto es agregado a cada categoria sin importar si ya fue agregado una vez, es decir hay repetidos.
// Hay que agregar la funcionalidad de la cantidad en el producto y utilizar la peticion PUT para editar esta.

controller.nuevoProducto = async (req,res ) => {
    const categoriaProducto = req.body.categoria;
    const nuevoProducto = new Producto({...req.body});
    const productoInsertado = await nuevoProducto.save();
    const categoria =  await Categoria.findOne({ categoria: categoriaProducto}).exec();
    categoria.productos.push(nuevoProducto);
    const  categoriaGuardada = await categoria.save();
    console.log(categoriaGuardada)
    return res.status(201).json(categoria);
}

controller.nuevaCategoria = async (req, res ) => {
    const nuevaCategoria = new Categoria({...req.body});
    const categoriaInsertada = await nuevaCategoria.save();
    return res.status(201).json(categoriaInsertada);
}


module.exports = controller