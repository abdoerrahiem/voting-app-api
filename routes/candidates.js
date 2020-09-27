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
router.use(auth)
router
  .route('/:id')
  .get(getCandidate)
  .delete(admin, deleteCandidate)
  .put(admin, updateCandidate)
router.put('/:id/chairman/photo', admin, addPhotoChairman)
router.put('/:id/viceChairman/photo', admin, addPhotoViceChairman)

module.exports = router
