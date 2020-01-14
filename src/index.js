const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//initializations 
const app = express();


//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs ({
    defaultLayout : "main",
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//Middlewares: son funciones que se ejecutan cada vez que un usuario envia una peticion 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global variables 
app.use((req, res, next)=>{
    next();
});


//Routes
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/citas', require('./routes/citas.js'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/reservas', require('./routes/reservas'));

//public 
app.use(express.static(path.join(__dirname, 'public')));

//Startin the server 
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});
