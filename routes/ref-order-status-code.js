let refOrderStatusController = require("../controllers/ref-order-status-controller");

let router = require("express").Router();

router
  .route("/ref-order-status-codes")
  .get(refOrderStatusController.list)
  .post(refOrderStatusController.create);

router
  .route("/ref-order-status-codes/:order_status_id")
  .get(refOrderStatusController.detail)
  .put(refOrderStatusController.update)
  .patch(refOrderStatusController.update)
  .delete(refOrderStatusController.remove);

module.exports = router;
