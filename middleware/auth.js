const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak. Token tidak tersedia.',
    })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Token tidak valid',
    })
  }
}

module.exports = auth
