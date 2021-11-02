const { Favourite } = require('../models')

const authorizationFavourite = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundFavourite = await Favourite.findOne({ where: { MovieId: id } })
    if (req.user.id == foundFavourite.UserId) {
      next()
    } else {
      throw ({ name: 'Forbidden' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authorizationFavourite