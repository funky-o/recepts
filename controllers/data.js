const errorHandler = require('../utils/errorHandler');
const db = require('../shared/recepts.json');
const models = require('../models/recept');

module.exports.getRecepts = async function(req, res) {
  try {
    var category = req.query.find;
    // console.log(models);
    console.log(category, category.length);
    const recepts = await models[category].find();
    console.log(recepts);
    console.log('recepts');
      res.status(200).json(recepts);
  } catch(e) {
      errorHandler(res, e);
  }
};

module.exports.getReceptId = async function(req, res) {
  try {
    const category = req.query.find;
    const id = req.query.id;
    const recept = await models[category].find({"id": id});

    res.status(200).json(recept[0]);
  } catch(e) {
    errorHandler(res, e);
  }
}

