let RefProductType = require("../models/ref-product-type");

function handleError(res, err) {
  res.json({
    status: "error",
    message: err
  });
}

module.exports.list = function(req, res) {
  RefProductType.find({}, (err, refProductTypes) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Ref Product Types retrieve successfully",
      data: refProductTypes
    });
  });
};

module.exports.create = function(req, res) {
  var refProductType = new RefProductType(req.body);

  refProductType.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Create Ref Product Types successfully",
      data: refProductType
    });
  });
};

module.exports.detail = function(req, res) {
  RefProductType.findById(
    req.params.ref_product_type_id,
    (err, refProductType) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Ref Product Type retrieve successfully",
        data: refProductType
      });
    }
  );
};

module.exports.update = (req, res) => {
  RefProductType.findByIdAndUpdate(
    req.params.ref_product_type_id,
    req.body,
    { new: true },
    (err, refProductType) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Ref Product Type updated",
        data: refProductType
      });
    }
  );
};

module.exports.remove = (req, res) => {
  RefProductType.findByIdAndDelete(
    req.params.ref_product_type_id,
    (err, refProductType) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Ref Product Type delete successfully"
      });
    }
  );
};
