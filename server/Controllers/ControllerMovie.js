const { Movie } = require('../models')

class ControllerMovie {
  static async findAllMovies(req, res, next) {
    try {
      const result = await Movie.findAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findByPkMovie(req, res, next) {
    const { id } = req.params
    try {
      const result = await Movie.findByPk(id)
      if (result) {
        res.status(200).json(result)
      }
      else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerMovie