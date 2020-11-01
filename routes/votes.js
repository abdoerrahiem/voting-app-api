const router = require('express').Router()
const {
  addVote,
  getVotes,
  getVote,
  deleteVote,
  deleteVotes,
  createPdf,
} = require('../controllers/votes')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.use(auth)

router.post('/createpdf', admin, createPdf)
router.route('/').get(admin, getVotes).delete(admin, deleteVotes)
router.route('/:id').get(admin, getVote).delete(admin, deleteVote)
router.route('/:candidateId').post(addVote)

module.exports = router
