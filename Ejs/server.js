/* ---------------------- Modulos ----------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const { emitWarning } = require('process');
/* ---------------------- Instancia de express ----------------------*/
const app = express();

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------- Conf Motor ----------------------*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('pages/index', {

});

/* ---------------------- Rutas ----------------------*/

const productos = [];
let proximoId = 0;

class Producto{
    constructor (id, nombre, precio, Foto){
        this.id = id;
        this.titulo = nombre;
        this.precio = precio;
        this.Foto = Foto;
    }
}


app.get('/producto', (req, res)=>{    
    res.render('pages/index');
});

app.post('/productos', (req, resp)=>
{    
    if (req.body.Nombre != '')
    {
    proximoId += 1;     
    let prod = new Producto(proximoId, req.body.Nombre, req.body.Precio, req.body.Foto);
    productos.push(prod);
    console.log(productos);
}
    resp.render('pages/listaProductos', {productos:productos});
});

app.get('/ejemploPartials', (req, res)=>{
    res.send('ruta ejemplo get ');
});

/* ---------------------- Servidor ----------------------*/
const PORT = 7272;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
