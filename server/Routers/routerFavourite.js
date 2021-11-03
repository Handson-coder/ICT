const router = require('express').Router()
const ControllerFavourite = require('../Controllers/ControllerFavourite')
const authentication = require('../middlewares/authentication')
const { authorizationFavourite } = require('../middlewares/authorization')

router.use(authentication)
router.get("/", ControllerFavourite.findAllFavouriteList)
router.post("/:id", ControllerFavourite.addMoviesToFavouriteList)
router.post("/create/payment/:id", ControllerFavourite.createPaymentTicket)
router.patch('/:id', authorizationFavourite, ControllerFavourite.patchingGenre)
router.delete('/:id', authorizationFavourite, ControllerFavourite.deleteMovieFromFavList)

module.exports = router