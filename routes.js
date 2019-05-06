let router = require("express").Router();

let colorRouter = require("./routes/color");
let refProductTypeRouter = require("./routes/ref-product-type");
let productRouter = require("./routes/product");
let customerRouter = require("./routes/customer");
let orderRouter = require("./routes/order");
let refOrderStatusCodeRouter = require("./routes/ref-order-status-code");
let orderItemRouter = require("./routes/order-item");

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

let checkReqBody = (req, res, next) => {
  if (!(req.method === "GET")) {
    if (isEmptyObject(req.body)) {
      res.status(405).json({
        message: "Need body in request"
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

router.use(checkReqBody);

router.use(colorRouter);
router.use(refProductTypeRouter);
router.use(productRouter);
router.use(customerRouter);
router.use(orderRouter);
router.use(refOrderStatusCodeRouter);
router.use(orderItemRouter);

module.exports = router;
