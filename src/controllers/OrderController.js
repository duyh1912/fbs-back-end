const Orders = require('../model/OrderModel');
const OrdersDetails = require('../model/OrderDetailsModel');
const orderService = require('../services/order');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('../helpers/jwt');

// Đặt hàng
exports.addOrder = function (req, response, next) {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });

    var orderReq = JSON.parse(req.body.order);
    var orderDetailsReq = JSON.parse(req.body.order_details);

    var order = Orders();
    order.idOrder = orderReq.orderId;
    order.totalAmount = orderReq.totalAmount;
    order.totalPrice = orderReq.totalPrice;
    order.status = "Waiting";
    order.userId = req.userId;
    order.created_at = nDate;
    order.update_at = nDate;
    Orders.create(order, (err, res) => {
        if(err){
            response.status(401).json({statusCode: 401, data: "Có lỗi xảy ra !!!"})
        }else{
            orderService.createOrderDetails(orderDetailsReq, (err, res1) => {
                if(err){
                    response.status(401).json({statusCode: 401, data: "Có lỗi xảy ra !!!"})
                }else{
                    response.status(200).json({statusCode: 200, data: "Đặt hàng thành công !!!"})
                }
            })
        }

    });


};

