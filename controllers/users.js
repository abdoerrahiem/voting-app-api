const User = require('../models/User')

// Register user/admin
exports.register = async (req, res) => {
  const { name, username, password, isAdmin } = req.body

  try {
    const user = await User.create({
      name,
      username,
      password,
      isAdmin,
    })

    const token = user.generateAuthToken()

    res.json({
      success: true,
      message: user.isAdmin
        ? 'Admin berhasil ditambahkan.'
        : 'User berhasil ditambahkan.',
      token,
    })
  } catch (err) {
    if (err._message === 'User validation failed') {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: 'Nama, username dan password harus diisi.',
      })
    }

    if (err.code === 11000)
      return res.status(400).json({
        success: false,
        message: 'Username telah digunakan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: 'Username dan password harus diisi.',
      })

    const user = await User.findOne({ username })
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    const isMatch = await user.matchPasswords(password)
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: 'Password yang anda masukkan salah.',
      })

    const token = user.generateAuthToken()
    res.json({
      success: true,
      token,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Login admin
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: 'Username dan password harus diisi.',
      })

    const user = await User.findOne({ username })
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    const isMatch = await user.matchPasswords(password)
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: 'Password yang anda masukkan salah.',
      })

    if (!user.isAdmin)
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Anda bukan admin.',
      })

    const token = user.generateAuthToken()
    res.json({
      success: true,
      token,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Get current user / me
exports.me = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  res.json({
    success: true,
    data: user,
  })
}

// Get all users
exports.getUsers = async (req, res) => {
  try {
    let users

    if (req.query.isVoted) {
      users = await User.find({ isVoted: req.query.isVoted }).select(
        '-password'
      )
    } else {
      users = await User.find().select('-password')
    }

    res.json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    res.json({
      success: true,
      data: user,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select('-password')
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    res.json({
      success: true,
      message: 'User berhasil dihapus.',
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Upload photo for user / admin
exports.addPhoto = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        photo: req.body.url,
      },
      { new: true }
    ).select('-password')

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
      })

    res.json({
      success: true,
      message: 'Photo berhasil ditambahkan.',
      data: user,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Update user
exports.updateUser = async (req, res) => {
  const { name, username, isAdmin } = req.body
  const body = { name, username, isAdmin }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    })
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' })

    res.json({ message: 'User berhasil diperbaharui.', data: user })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: error.message || 'Server error.',
    })
  }
}

// Sort user by name
exports.getUsersByName = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.body.name, $options: 'i' },
    })
    if (!users) return res.status(404).json({ message: 'User tidak ditemukan' })

    res.json({ data: users })
  } catch (error) {
    if (error.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: error.message || 'Server error.',
    })
  }
}
