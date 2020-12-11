const express = require('express');
const routerWeb = express();
const Products = require('../model/ProductModel');
const Orders = require('../model/OrderModel');
const multer = require("multer");

const abc = require('../controllers/abc');
const adminController = require('../controllers/AdminContrroller');
const uuid = require('uuid');

const mongoose = require('mongoose');
const products = mongoose.model('Products');
const cates = mongoose.model('Cates');
const review = mongoose.model('Reviews');
const Passport = require('passport');
var cate = require('../model/CateModel');
const images = require('../model/ImagesModel');



//muler upload
const multerStorage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split(".").pop();
        cb(
            null,
            `photo-${Math.random()
                .toString(16)
                .substring(2)}.${ext}`
        );
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadDefault = multer({
    storage: multerStorage,
    fileFilter: fileFilter
});

// Đăng nhập
routerWeb.get('/', function (req, res) {
    res.render('signin', {layout: false});
});
routerWeb.post('/login', adminController.login);

// Đăng kí
routerWeb.get('/signup', function (req, res){
    res.send("dangky");
});
routerWeb.post('/signup', adminController.register);
// GET /logout
routerWeb.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

// Get/ list
routerWeb.get('/index', abc.getAllProduct);
routerWeb.get('/delete_product/:id', abc.deleteProduct);
routerWeb.get('/delete_cate/:id', abc.deleteCate);
// chap nhan don hang
routerWeb.post('/accept_order-details', (req,res1)=>{
    console.log("dfadf");
        console.log(req.body.idOrder);
        Orders.findOneAndUpdate({idOrder : req.body.idOrder},{status : "Accept"},(err,res)=>{
            res1.redirect('list_order');
        })
});
routerWeb.get('/list_cate', abc.getAllCate);
routerWeb.get('/list_user', abc.getAllUser);
routerWeb.get('/list_order', abc.getAllOrders);
routerWeb.get('/get_order-details/:id', abc.getOrderDetails);
// GET/add
routerWeb.get('/add_product', abc.addProduct);
routerWeb.get('/add_banner', (err, res) => {
    res.render("add_banner")
});


routerWeb.get('/add_cate', (req, res) => {
    res.render('add_cate', {layout: false});
});
// GET/update
routerWeb.get('/edit_product/:id', abc.getProduct);
routerWeb.get('/edit_cate/:id', abc.getCate);
// POST/create
routerWeb.post('/create_product', uploadDefault.array('files'), (req, res1) => {
    const productId = uuid.v1();
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    var image;
    req.files.forEach(async (item, index, array) => {
        image = array[0].filename;
        var imageProduct = images();
        imageProduct.imageId = uuid.v1();
        imageProduct.url = item.filename;
        imageProduct.productId = productId;
        await images.create(imageProduct, (err, res) => {
            if (err) res.status(404).json({statusCode: 404, err: 'Có lỗi xảy ra!'})
        })
    });


    const product = new products(req.body);
    product.productId = productId;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.image = image;
    product.cateId = req.body.cateId;
    product.delete_at = null;
    product.created_at = nDate;
    product.update_at = nDate;

    products.create(product, (err, res) => {
        if (err) console.log(err);
        res1.redirect('/index');
    })

});
routerWeb.post('/create_cate', uploadDefault.single('file'), (req, res1) => {
    const cate = new cates(req.body);
    cate.cateId = uuid.v1();
    cate.name = req.body.name;
    cate.images = req.file.filename;
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    cate.created_at = nDate;
    cate.update_at = nDate;
    cate.delete_at = null;

    cates.create(cate, (err, res) => {
        if (err) console.log(err);
        res1.redirect('/list_cate');


    })

});
// POsT/Update
routerWeb.post('/update_product', uploadDefault.single('file'), (req, res) => {

    var image;
    try {
        image = req.file.filename
    } catch (e) {
        image = req.body.image;

    }

    products.updateOne(
        {_id: req.body.id},
        {
            $set: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: image,
                cateId: req.body.cateId
            }
        },
        (err, doc) => {
            if (!err) {
                res.redirect('/index');
            } else {
                console.log('Edit Failed');
            }
        }
    );

});
routerWeb.post('/update_cate', uploadDefault.single('file'), (req, res) => {

    var image;
    try {
        image = req.file.filename
    } catch (e) {
        image = req.body.image;

    }

    cate.updateOne(
        {_id: req.body.id},
        {$set: {name: req.body.name, images: image}},
        (err, doc) => {
            if (!err) {
                res.redirect('/list_cate');
            } else {
                console.log('Edit Failed');
            }
        }
    );

});
module.exports = routerWeb
