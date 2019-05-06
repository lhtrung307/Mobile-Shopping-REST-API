let refOrderStatusController = require("../controllers/ref-order-status-controller");

let router = require("express").Router();

router
  .route("/ref-order-status-codes")
  .get(refOrderStatusController.list)
  .post(refOrderStatusController.create);

router
  .route("/ref-order-status-codes/:ref_order_status_code_id")
  .get(refOrderStatusController.detail)
  .put(refOrderStatusController.update)
  .patch(refOrderStatusController.update)
  .delete(refOrderStatusController.remove);

module.exports = router;
