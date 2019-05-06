let RefOrderStatusCodes = require("../models/ref-order-status");

let handleError = require("./colorController").handleError;

module.exports.list = (req, res) => {
  RefOrderStatusCodes.find({}, (err, refOrderStatusCodes) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Ref Order Status Codes retrieve succesfully",
      data: refOrderStatusCodes
    });
  });
};

module.exports.create = (req, res) => {
  let refOrderStatusCode = new RefOrderStatusCodes(req.body);

  refOrderStatusCode.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Ref Order Status Code create successfully"
    });
  });
};

module.exports.detail = (req, res) => {
  RefOrderStatusCodes.findById(
    req.params.ref_order_status_id,
    (err, refOrderStatusCode) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Ref Order Status Code retrieve successfully",
        data: refOrderStatusCode
      });
    }
  );
};

module.exports.update = (req, res) => {
  RefOrderStatusCodes.findByIdAndUpdate(
    req.params.ref_order_status_id,
    req.body,
    { new: true },
    (err, refOrderStatusCode) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Ref Order Status Code updated",
        data: refOrderStatusCode
      });
    }
  );
};

module.exports.remove = (req, res) => {
  RefOrderStatusCodes.findByIdAndDelete(
    req.params.ref_order_status_id,
    (err, refOrderStatusCode) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Ref Order Status deleted"
      });
    }
  );
};
