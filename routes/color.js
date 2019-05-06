let router = require("express").Router();

let colorController = require("../controllers/colorController");

router
  .route("/colors")
  .get(colorController.list)
  .post(colorController.create);

router
  .route("/colors/:color_id")
  .get(colorController.detail)
  .put(colorController.update)
  .patch(colorController.update)
  .delete(colorController.remove);

module.exports = router;
