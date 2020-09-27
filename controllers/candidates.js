const Candidate = require('../models/Candidate')

// Create candidates
exports.createCandidate = async (req, res) => {
  const {
    nameOfChairman,
    nameOfViceChairman,
    birthdayOfChairman,
    birthdayOfViceChairman,
    addressOfChairman,
    addressOfViceChairman,
    experienceOfChairman,
    experienceOfViceChairman,
    visionAndMission,
    motto,
  } = req.body

  try {
    const candidate = await Candidate.create({
      nameOfChairman,
      nameOfViceChairman,
      birthdayOfChairman,
      birthdayOfViceChairman,
      addressOfChairman,
      addressOfViceChairman,
      experienceOfChairman: experienceOfChairman.split(','),
      experienceOfViceChairman: experienceOfViceChairman.split(','),
      visionAndMission: visionAndMission.split(','),
      motto,
    })

    res.json({
      success: true,
      message: 'Kandidat berhasil ditambahkan.',
      data: candidate,
    })
  } catch (err) {
    if (err._message === 'Candidate validation failed')
      return res.status(400).json({
        success: false,
        message: 'Data yang anda masukkan tidak lengkap.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Get candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()

    res.json({
      success: true,
      count: candidates.length,
      data: candidates,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Get candidate by id
exports.getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
    if (!candidate)
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    res.json({
      success: true,
      data: candidate,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Delete candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id)
    if (!candidate)
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    res.json({
      success: true,
      message: 'Kandidat berhasil dihapus.',
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Update candidate
exports.updateCandidate = async (req, res) => {
  const {
    nameOfChairman,
    nameOfViceChairman,
    birthdayOfChairman,
    birthdayOfViceChairman,
    addressOfChairman,
    addressOfViceChairman,
    experienceOfChairman,
    experienceOfViceChairman,
    visionAndMission,
    motto,
  } = req.body

  const fieldsToUpdate = {
    nameOfChairman,
    nameOfViceChairman,
    birthdayOfChairman,
    birthdayOfViceChairman,
    addressOfChairman,
    addressOfViceChairman,
    experienceOfChairman,
    experienceOfViceChairman,
    visionAndMission,
    motto,
  }

  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
      }
    )
    if (!candidate)
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    res.json({
      success: true,
      message: 'Kandidat berhasil diperbaharui.',
      data: candidate,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// add photo to chairman
exports.addPhotoChairman = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        photoOfChairman: req.body.chairmanUrl,
      },
      { new: true }
    ).select('-password')

    if (!candidate)
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan',
      })

    res.json({
      success: true,
      message: 'Photo berhasil ditambahkan.',
      data: candidate,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// add photo to vice chairman
exports.addPhotoViceChairman = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        photoOfViceChairman: req.body.viceChairmanUrl,
      },
      { new: true }
    ).select('-password')

    if (!candidate)
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan',
      })

    res.json({
      success: true,
      message: 'Photo berhasil ditambahkan.',
      data: candidate,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}
