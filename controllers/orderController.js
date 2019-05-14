let Order = require("../models/order");

function handleError(res, err) {
  res.json({
    status: "error",
    message: err
  });
}

module.exports.list = (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Orders retrieve succesfully",
      data: orders
    });
  });
};

module.exports.create = (req, res) => {
  var order = new Order(req.body);

  order.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Order create successfully",
      data: order
    });
  });
};

module.exports.detail = (req, res) => {
  Order.findById(req.params.order_id, (err, order) => {
    if (err) {
      return handleError(res, err);
    }

    res.status(200).json({
      message: "Order retrieve successfully",
      data: order
    });
  });
};

module.exports.update = (req, res) => {
  Order.findByIdAndUpdate(
    req.params.order_id,
    req.body,
    { new: true },
    (err, order) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Order updated",
        data: order
      });
    }
  );
};

module.exports.remove = (req, res) => {
  Order.findByIdAndDelete(req.params.order_id, (err, order) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Order deleted"
    });
  });
};
