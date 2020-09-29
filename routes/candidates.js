const router = require('express').Router()
const {
  createCandidate,
  getCandidates,
  getCandidate,
  deleteCandidate,
  updateCandidate,
  addPhotoChairman,
  addPhotoViceChairman,
} = require('../controllers/candidates')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.route('/').post(auth, admin, createCandidate).get(getCandidates)
router
  .route('/:id')
  .get(getCandidate)
  .delete(auth, admin, deleteCandidate)
  .put(auth, admin, updateCandidate)
router.put('/:id/chairman/photo', auth, admin, addPhotoChairman)
router.put('/:id/viceChairman/photo', auth, admin, addPhotoViceChairman)

module.exports = router
