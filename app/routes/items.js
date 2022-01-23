
var express = require("express");
var router = express.Router();
var asyncHandler = require("./../middleware/async");

const controllerName = "items";
const MainModel = require(__path_models + controllerName);

router.get("/", asyncHandler ( async (req, res, next) => {
  let params = [];
  params.sortField = req.query.orderBy;
  params.sortType = req.query.orderType;
  params.keyword = req.query.keyword;

  const data = await MainModel.listItems(params, {"task": "all"});
  
  res.status(201).json({ 
    sussess: true,
    data: data
  });
}))

router.get("/:id", asyncHandler ( async (req, res, next) => {
  const data = await MainModel.listItems({"id": req.params.id}, {"task": "one"});
  res.status(201).json({
    sussess: true,
    data: data
  });
}))

router.post("/add", asyncHandler ( async (req, res, next) => {
  let params = [];
  params.name = req.body.name;
  params.status = req.body.status;
  const data = await MainModel.create(params);
  res.status(201).json({
    sussess: true,
    data: data
  });
}))

router.put("/edit/:id", asyncHandler ( async (req, res, next) => {
  let body = req.body;
  const data = await MainModel.updateItem({"id": req.params.id, "body": body}, {"task": "edit"});
  res.status(201).json({
    sussess: true,
    data: data
  });
}))

router.delete("/delete/:id", asyncHandler ( async (req, res, next) => {
  const data = await MainModel.deleteItems({"id": req.params.id}, {"task": "one"});
  res.status(201).json({
    sussess: true,
    data: data
  });
}))

module.exports = router;
