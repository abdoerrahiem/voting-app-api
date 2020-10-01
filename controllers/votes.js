const Vote = require('../models/Vote')
const User = require('../models/User')
const Candidate = require('../models/Candidate')

// Add vote
exports.addVote = async (req, res) => {
  const newVote = {
    user: req.user._id,
    candidate: req.params.candidateId,
  }

  try {
    const user = await User.findById(req.user._id)
    const candidate = await Candidate.findById(req.params.candidateId)

    if (user.isVoted)
      return res.status(400).json({
        success: false,
        message: 'Anda telah melakukan voting.',
      })
    user.isVoted = true
    await user.save()

    if (!candidate)
      return res.status(404).json({
        success: false,
        message: 'Kandidat tidak ditemukan.',
      })

    const vote = await Vote.create(newVote)

    candidate.totalSuara += 1
    await candidate.save()

    res.json({
      success: true,
      message: 'Vote berhasil. Terima kasih atas partisipasi kamu.',
      data: vote,
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

// Get all votes
exports.getVotes = async (req, res) => {
  try {
    let votes

    if (req.query.candidateId) {
      votes = await Vote.find({ candidate: req.query.candidateId })
    } else {
      votes = await Vote.find()
        .populate('candidate', 'nameOfChairman nameOfViceChairman')
        .populate('user', 'name username')
    }

    res.json({
      success: true,
      count: votes.length,
      data: votes,
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

// Get vote by id
exports.getVote = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id)
      .populate('user', '_id name username')
      .populate('candidate', '_id nameOfChairman nameOfViceChairman')
    if (!vote)
      return res.status(404).json({
        success: false,
        message: 'Vote tidak ditemukan',
      })

    res.json({
      success: true,
      data: vote,
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Vote tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Delete vote
exports.deleteVote = async (req, res) => {
  try {
    const vote = await Vote.findByIdAndDelete(req.params.id)
    if (!vote)
      return res.status(404).json({
        success: false,
        message: 'Vote tidak ditemukan.',
      })

    let user = await User.findById(vote.user)
    user.isVoted = false
    await user.save()

    res.json({
      success: true,
      message: 'Vote berhasil dihapus.',
    })
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(404).json({
        success: false,
        message: 'Vote tidak ditemukan.',
      })

    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}

// Delete all votes
exports.deleteVotes = async (req, res) => {
  try {
    await Vote.deleteMany()

    let users = await User.find({ isVoted: true })
    users.forEach((user) => {
      user.isVoted = false
      user.save()
    })

    res.json({
      success: true,
      message: 'Semua vote berhasil dihapus.',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Server error.',
    })
  }
}
