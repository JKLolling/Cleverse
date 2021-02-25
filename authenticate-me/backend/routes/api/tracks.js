const express = require('express')
const asyncHandler = require('express-async-handler')
const { Track, Annotation } = require('../../db/models')

const router = express.Router()

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const track = await Track.findByPk((req.params.id), {
    include: Annotation
  })
  res.json({ track })
}))

module.exports = router
