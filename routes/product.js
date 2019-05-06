let router = require("express").Router();

let productController = require("../controllers/productController");

router
  .route("/products")
  .get(productController.list)
  .post(productController.create);

router
  .route("/products/:product_id")
  .get(productController.detail)
  .put(productController.update)
  .patch(productController.update)
  .delete(productController.remove);

module.exports = router;
