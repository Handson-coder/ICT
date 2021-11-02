const { Movie, Favourite } = require('../models')

class ControllerFavourite {
  static async findAllFavouriteList(req, res, next) {
    try {
      const result = await Favourite.findAll({
        where: {
          UserId: req.user.id
        },
        include: [
          {
            model: Movie,
          }
        ],
        order: [['id', 'DESC']]
      })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async addMoviesToFavouriteList(req, res, next) {
    const { id } = req.params
    try {
      const foundMovie = await Movie.findByPk(id)
      if (!foundMovie) {
        throw ({ name: 'Data not found' })
      } else {
        await Favourite.create({
          UserId: req.user.id,
          MovieId: foundMovie.id
        })
        res.status(201).json({ message: `${foundMovie.title} has been added to you favourite lists` })
      }
    } catch (err) {
      next(err)
    }
  }

  static async patchingGenre(req, res, next) {
    const data = {
      genre: req.body.genre
    }
    const { id } = req.params
    console.log(data);
    console.log(id);
    try {
      const findMovie = await Movie.findByPk(id)
      console.log(findMovie);
      if (findMovie) {
        const result = await Movie.update(data, { where: { id }, returning: true })
        res.status(200).json(result[1][0])
      } else {
        throw { name: 'Data not found' }
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteMovieFromFavList(req, res, next) {
    const { id } = req.params
    try {
      const foundFavourite = await Favourite.findOne({ where: {} })
      if (foundFavourite) {
        await Favourite.destroy({ where: { id } })
        res.status(200).json({ message: `Success deleted from your Favourite List` })
      } else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerFavourite