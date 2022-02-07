/* ---------------------- Modulos ----------------------*/
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
/* ---------------------- Instancia de express ----------------------*/
const app = express();

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------- Conf Motor ----------------------*/

app.set('views', path.join('views'));
app.set('view engine', ''); 

/* ---------------------- Rutas ----------------------*/
const productos = [];
let proximoId = 0;

class Producto{
    constructor (id, nombre, precio, foto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

app.get('/producto', (req, res)=>{        
    res.render('AltaProducto.pug'); 
});

app.post('/productos', (req, resp)=>
{    
    proximoId += 1;     
    let prod = new Producto(proximoId, req.body.Nombre, req.body.Precio, req.body.Foto);
    productos.push(prod);
    console.log(productos);
    resp.render('listaProductos.pug', {results: productos});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 7272;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
