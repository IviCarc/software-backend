const productos = require("./productos-test.js");
const mongoose = require('mongoose');
const fs = require('fs');

const { Categoria, Vendedor } = require('./models.js');

// MULTER
const multer = require('multer');

const storage = multer.diskStorage({})

const upload = multer({ storage: storage }).single('imagenes')


const controller = {}

controller.getAllProducts = async (req, res) => {
    res.send(productos);
}

controller.todosProductos = async (req, res) => {
    const todosProductos = await Producto.find();
    res.send(todosProductos)
}

// Funcion de la pagina principal
controller.todasCategorias = async (req, res) => {
    const todasCategorias = await Categoria.find();
    console.log(todasCategorias)
    res.send(todasCategorias);
}

controller.obtenerProducto = async (req, res) => {
    const { categoria, id } = req.params;
    console.log(categoria, id);
    const producto = await Producto.findOne({ _id: id });
    // const categoria = await Categoria.findOne({categoria:categoria});
    // const producto = Categoria
    console.log(producto)
    res.send(producto);
}

// getAllProducts es la prueba que utiliza la página

// Por ahora, el producto es agregado a cada categoria sin importar si ya fue agregado una vez, es decir hay repetidos.
// Hay que agregar la funcionalidad de la cantidad en el producto y utilizar la peticion PUT para editar esta.

controller.findSubcategorias = async (req, res) => {
    const categoria = req.body.categoria;
    const categoriaID = await Categoria.findOne({nombre : categoria}).exec();
    console.log(categoriaID)
    res.send(categoriaID.subcategorias);
}

controller.nuevaCategoria = async (req, res) => {
    console.log(req.body)
    const nuevaCategoria = new Categoria({nombre : req.body.categoria});
    const categoriaInsertada = await nuevaCategoria.save();
    return res.status(201).json(categoriaInsertada);
}

controller.nuevaSubcategoria = async(req, res) => {
    const {categoriaNombre, subcategoria} = req.body;
    const categoria = await Categoria.findOne({nombre : categoriaNombre});
    categoria.subcategorias.push({nombre : subcategoria})
    await categoria.save()
    return res.status(201).json(categoria)
}

controller.nuevoProducto = async (req, res) => {
    // console.log(req.headers)
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500);
        }
       
        const categoriaProducto = await Categoria.findOne({nombre : req.body.categoria});

        const subcategoriaProducto = categoriaProducto.subcategorias;

        console.log(subcategoriaProducto)

        // const nuevoProducto = new Producto(
        //     {
        //         ...req.body,
        //         imagenes: fs.readFileSync(`${req.file.path}`)
        //     });

        const nuevoProducto = {
            ...req.body,
            imagenes: fs.readFileSync(`${req.file.path}`)
        }
        // console.log(nuevoProducto)
        // const productoInsertado = await nuevoProducto.save();
        // const categoria = await Categoria.findOne({ categoria: categoriaProducto }).exec();
        // categoria.productos.push(nuevoProducto);
        // const categoriaGuardada = await categoria.save();
        // return res.status(201).json(categoria);
    });

}

module.exports = controller