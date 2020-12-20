var mongoose = require('mongoose');


<<<<<<< HEAD
// // var URL = 'mongodb+srv://vnfood:vnfood@cluster0.amioj.mongodb.net/adminfbs?retryWrites=true&w=majority';
// var URL = 'mongodb+srv://vnfood:vnfood@cluster0-amioj.mongodb.net/vnfood?retryWrites=true&w=majority';
=======
// var URL = 'mongodb+srv://vnfood:vnfood@cluster0.amioj.mongodb.net/adminfbs?retryWrites=true&w=majority';
// var URL = 'mongodb+srv://vnfood:vnfood@cluster0-amioj.mongodb.net/vnfood?retryWrites=true&w=majority';
var URL = 'mongodb+srv://admin:admin@cluster0.qvjxs.mongodb.net/fbs?retryWrites=true&w=majority';
>>>>>>> 12f8686d1af52e699f090a13711af6400e5defa0

// mongodemo
var URL = 'mongodb+srv://admin:admin@cluster0.qvjxs.mongodb.net/fbs?retryWrites=true&w=majority';

mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(process.env.MONGODB_URI || URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
//Modelsfalse
var db = mongoose.connection;

db.on('error', () => {
    console.error('Lỗi không thể kết nối tới MongoDB');
});

db.on('open', () => {
    console.log('Kết nối MongoDB thành công');
});
