const router = require('express').Router()
const {
  register,
  loginUser,
  loginAdmin,
  me,
  getUsers,
  getUser,
  deleteUser,
  addPhoto,
  updateUser,
  getUsersByName,
} = require('../controllers/users')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/me', auth, me)
router.get('/usersByName', auth, admin, getUsersByName)
router.get('/', auth, admin, getUsers)
router.get('/:id', auth, admin, getUser)
router.put('/:id', auth, admin, updateUser)
router.delete('/:id', auth, admin, deleteUser)
router.post('/register', auth, admin, register)
router.post('/loginUser', loginUser)
router.post('/loginAdmin', loginAdmin)
router.put('/:id/photo', auth, admin, addPhoto)

module.exports = router
