let Customer = require("../models/customer");

function handleError(res, err) {
  res.json({
    status: "error",
    message: err
  });
}

module.exports.list = (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Customers retrieve successfully",
      data: customers
    });
  });
};

module.exports.create = (req, res) => {
  let customer = new Customer(req.body);
  customer.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Customer create successfully",
      data: customer
    });
  });
};

module.exports.detail = (req, res) => {
  Customer.findById(req.params.customer_id, (err, customer) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Customer retrieve successfully",
      data: customer
    });
  });
};

module.exports.remove = (req, res) => {
  Customer.findByIdAndDelete(req.params.customer_id, (err, customer) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Customer deleted"
    });
  });
};

module.exports.update = (req, res) => {
  Customer.findByIdAndUpdate(
    req.params.customer_id,
    req.body,
    { new: true },
    (err, customer) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Customer updated",
        data: customer
      });
    }
  );
};
