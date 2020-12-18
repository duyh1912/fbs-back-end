var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars');
var path = require('path');
const http = require('http');
const AuthMiddleWare = require('./src/middleware/auth_middleware');
const routerMain = express.Router();
const abc = require('./src/controllers/abc')



//Routes
var usersRouter = require('./src/routers/routerUser');
var catesRouter = require('./src/routers/routerCate');
var productsRouter = require('./src/routers/routerProduct');
var webRouter = require('./src/routers/routerWeb');
var uploadRouter = require('./src/routers/routerUpload');
var ordersRouter = require('./src/routers/routerOrder');

//Configs
require('./src/connection/connection');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/public/photo", express.static(path.join('/Users/pro/ProjectAndroid/android_server/webadmin/public/uploads')));
app.use("/public/photo", express.static("public/uploads"));
app.use('*/css', express.static('public/css'));


// cấu hình hbs
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/',webRouter);
app.use('/api/users', usersRouter);
app.use('/api/cates', catesRouter);
app.use('/api/products', productsRouter.routerProduct);
app.use('/api/orders',ordersRouter);
//upload
app.use('/api/upload', uploadRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
