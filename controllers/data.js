const errorHandler = require('../utils/errorHandler');
const db = require('../shared/recepts.json');

module.exports.getRecepts = function(req, res) {
  try {
    var category = req.query.find;
    const arrayCategory = db['recepts'][category];
      res.status(200).json(arrayCategory);
  } catch(e) {
      errorHandler(res, e);
  }
};

module.exports.getReceptId = async function(req, res) {
  try {
    const category = req.query.find;
    const id = req.query.id;
    const recept = await function() {
      const arrayCategory = db['recepts'][category];
      return arrayCategory.find((recept) => {
        if (recept.id.toString() === id) {
          return true;
        }
        return false;
      })
    }();

    res.status(200).json(recept);
  } catch(e) {
    errorHandler(res, e);
  }
}

