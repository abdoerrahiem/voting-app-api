const admin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Anda bukan admin.',
    })

  next()
}

module.exports = admin
