let Color = require("../models/color");

module.exports.handleError = (res, err) => handleError(res, err);
function handleError(res, err) {
  res.json({
    status: "error",
    message: err
  });
}

module.exports.list = (req, res) => {
  Color.find({}, (err, colors) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Colors retrieve succesfully",
      data: colors
    });
  });
};

module.exports.detail = function(req, res) {
  Color.findById(req.params.color_id, (err, color) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json({
      message: "Color retrieve succesfully",
      data: color
    });
  });
};

module.exports.create = function(req, res) {
  var color = new Color();
  color.color_description = req.body.color_description;

  color.save((err) => {
    if (err) {
      return handleError(res, err);
    }
    res.json({
      status: "success",
      message: "Color create succesfully",
      data: color
    });
  });
};

module.exports.update = (req, res) => {
  Color.findByIdAndUpdate(
    req.params.color_id,
    req.body,
    { new: true },
    (err, color) => {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json({
        message: "Color updated",
        data: color
      });
    }
  );
};

module.exports.remove = function(req, res) {
  Color.remove({ _id: req.params.color_id }, (err, color) => {
    if (err) {
      return handleError(res, err);
    }
    res.json({
      status: "success",
      message: "Delete color successfully"
    });
  });
};
