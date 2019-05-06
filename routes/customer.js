let customerController = require("../controllers/customerController");

let router = require("express").Router();

router
  .route("/customers")
  .get(customerController.list)
  .post(customerController.create);

router
  .route("/customers/:customer_id")
  .get(customerController.detail)
  .put(customerController.update)
  .patch(customerController.update)
  .delete(customerController.remove);

module.exports = router;
