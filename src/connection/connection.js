var mongoose = require('mongoose');

// We need to difine the URL
// var URL = 'mongodb+srv://vnfood:vnfood@cluster0-amioj.mongodb.net/vnfood?retryWrites=true&w=majority';
var URL = 'mongodb+srv://fbs:fbs@cluster0.phcap.mongodb.net/fbs?retryWrites=true&w=majority';
// mongodb+srv://fbs:<password>@cluster0.phcap.mongodb.net/<dbname>?retryWrites=true&w=majority


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
