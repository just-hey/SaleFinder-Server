const { Food } = require('../models')

class FoodsController {
  constructor() {}

  static searchByName (req, res, next) {
    console.log(req.params)
    Food.searchByName(req.params.name)
      .then(foods => {
        return res.json({ foods })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }
}

module.exports = FoodsController
