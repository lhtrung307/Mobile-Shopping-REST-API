let router = require("express").Router();

let refProductTypeController = require("../controllers/ref-product-type-controller");

router
  .route("/ref-product-types")
  .get(refProductTypeController.list)
  .post(refProductTypeController.create);

router
  .route("/ref-product-types/:ref_product_type_id")
  .get(refProductTypeController.detail)
  .put(refProductTypeController.update)
  .patch(refProductTypeController.update)
  .delete(refProductTypeController.remove);

module.exports = router;
