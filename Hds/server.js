/* ---------------------- Modulos ----------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
/* ---------------------- Instancia de express ----------------------*/
const app = express();

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* ---------------------- Conf Motor ----------------------*/
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

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
    res.render('altaproducto');
});

app.get('/productos', (req, res)=>{    
    res.render('listaProductos', productos);
});

app.post('/productos', (req, resp)=>
{    
    proximoId += 1;     
    let prod = new Producto(proximoId, req.body.Nombre, req.body.Precio, req.body.Foto);
    productos.push(prod);
    console.log(productos);
    resp.render('listaProductos', {productos:productos});
});

/* ---------------------- Servidor ----------------------*/
const PORT = 7272;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
