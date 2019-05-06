let orderItemController = require("../controllers/order-item-controller");

let router = require("express").Router();

router
  .route("/order-items")
  .get(orderItemController.list)
  .post(orderItemController.create);

router
  .route("/order-items/:order_item_id")
  .get(orderItemController.detail)
  .put(orderItemController.update)
  .patch(orderItemController.update)
  .delete(orderItemController.remove);

module.exports = router;
