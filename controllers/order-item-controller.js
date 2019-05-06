let OrderItem = require("../models/order-item");

let handleError = require("./colorController").handleError;

module.exports.list = (req, res) => {
  OrderItem.find({}, (err, orderItems) => {
    if (err) {
      handleError(res, err);
    }
    res.status(200).json({
      message: "Order Items retrieve successfully",
      data: orderItems
    });
  });
};

module.exports.create = (req, res) => {
  let orderItem = new OrderItem(req.body);

  orderItem.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Order Item created",
      data: orderItem
    });
  });
};

module.exports.detail = (req, res) => {
  OrderItem.findById(req.params.order_item_id, (err, orderItem) => {
    if (err) {
      handleError(res, err);
    }
    res.status(200).json({
      message: "Order Item retrieve successfully",
      data: orderItem
    });
  });
};

module.exports.update = (req, res) => {
  OrderItem.findByIdAndUpdate(
    req.params.order_item_id,
    req.body,
    { new: true },
    (err, orderItem) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Order Item updated",
        data: orderItem
      });
    }
  );
};

module.exports.remove = (req, res) => {
  OrderItem.findOneAndDelete(req.params.order_item_id, (err, orderItem) => {
    if (err) {
      handleError(res, err);
    }
    res.status(200).json({
      message: "Order Item deleted"
    });
  });
};
