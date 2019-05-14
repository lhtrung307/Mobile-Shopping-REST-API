let Product = require("../models/product");

function handleError(res, err) {
  res.json({
    status: "error",
    message: err
  });
}

module.exports.list = function(req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Products retrieve succesfully",
      data: products
    });
  })
    .populate("colors")
    .populate("product_type_code");
};

module.exports.create = function(req, res) {
  var product = new Product();
  var { product_type_code, name, price, colors, size, description } = req.body;
  product.product_type_code = product_type_code;
  product.name = name;
  product.price = price;
  product.colors = colors;
  product.size = size;
  product.description = description;

  product.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Product create successfully",
      data: product
    });
  });
};

module.exports.detail = function(req, res) {
  Product.findById(req.params.product_id, (err, product) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Product retrieve successfully",
      data: product
    });
  });
};

module.exports.update = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.product_id,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Product updated",
        data: product
      });
    }
  );
};

module.exports.remove = (req, res) => {
  Product.findByIdAndDelete(req.params.product_id, (err, product) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Product deleted"
    });
  });
};
