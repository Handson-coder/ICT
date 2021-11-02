const router = require('express').Router()
const routerUser = require('./routerUser')
const routerMovie = require('./routerMovie')
const routerFavourite = require('./routerFavourite')
const errorHandler = require('../middlewares/errorHandler')

router.use('/users', routerUser)
router.use('/favourites', routerFavourite)
router.use('/movies', routerMovie)

router.use(errorHandler)

module.exports = router