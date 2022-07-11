const productos = require("./productos-test.js");

const controller = {}

controller.getAllProducts = (req, res) => {
    console.log('hi')
    res.send(productos);
}



module.exports = controller