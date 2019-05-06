let router = require("express").Router();

let colorController = require("../controllers/colorController");

router
  .route("/")
  .get(colorController.list)
  .post(colorController.create);

router
  .route("/:color_id")
  .get(colorController.detail)
  .put(colorController.update)
  .patch(colorController.update)
  .delete(colorController.remove);

module.exports = router;
