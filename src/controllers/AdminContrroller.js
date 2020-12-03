const Admin = require('../model/AdminModels.js');


exports.login = function (req, res) {
    Admin.findOne({ email: req.body.email, password: req.body.password }).then((data) => {
        if (data) {
            if ((data.password = req.body.password)) {
                res.redirect('index');
            }
        }
    });
};

exports.register = function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password !== password2) {
        console.log('Password do not match');
    } else {
        let admin = new Admin({
            name :name,
            email: email,
            password: password,
        });

        admin.save(function (err) {
            if (err) {
                console.log("them thanh cong");
                return;
            } 
        });
    }
};
