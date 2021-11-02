const router = require('express').Router()
const ControllerMovie = require('../Controllers/ControllerMovie')

router.get('/', ControllerMovie.findAllMovies)
router.get('/:id', ControllerMovie.findByPkMovie)

module.exports = router