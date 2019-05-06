let orderController = require("../controllers/orderController");

let router = require("express").Router();

router
  .route("/orders")
  .get(orderController.list)
  .post(orderController.create);

router
  .route("/orders/:order_id")
  .get(orderController.detail)
  .put(orderController.update)
  .patch(orderController.update)
  .delete(orderController.remove);

module.exports = router;
