const mongoose = require("mongoose");
const {Schema} = mongoose;

// BUSCAR METODO POPULATE

const VendedorSchema = new Schema ({
    nombre:String,
    apellido:String,
    email:String,
    contraseña:String, // FALTA HASH
    direccion:String,
    paisResidencia:String,
    telefono: Number,
    // HISTORIAL
    productos :{ type: Schema.ObjectId, ref: "Producto" }
})

const ProductosSchema = new Schema({
    nombre : String,
    descripcion : String,
    caracteristicas : String, // OBJETO EN REALIDAD
    stock : Number,
    precio : Number,
    imagenes : Buffer,
    vendedor : { type: Schema.ObjectId, ref: "Vendedor" },
})

const SubcategoriaSchema = new Schema ({
    nombre: String,
    productos : [ProductosSchema]
})

const CategoriaSchema  = new Schema ({
    nombre : String,
    subcategorias : [SubcategoriaSchema]
})

const Vendedor = mongoose.model("Vendedor", VendedorSchema);
const Categoria = mongoose.model("Categoria", CategoriaSchema);

module.exports = {Categoria, Vendedor}