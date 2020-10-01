const mongoose = require('mongoose')

const candidate = new mongoose.Schema({
  nameOfChairman: {
    type: String,
    required: [true, 'Nama calon ketua harus diisi.'],
  },
  nameOfViceChairman: {
    type: String,
    required: [true, 'Nama calon wakil ketua harus diisi.'],
  },
  birthdayOfChairman: {
    type: Date,
    require: [true, 'Tanggal lahir calon ketua harus diisi.'],
  },
  birthdayOfViceChairman: {
    type: Date,
    require: [true, 'Tanggal lahir calon wakil ketua harus diisi.'],
  },
  addressOfChairman: {
    type: String,
    require: [true, 'Alamat calon ketua harus diisi.'],
  },
  addressOfViceChairman: {
    type: String,
    require: [true, 'Alamat calon wakil ketua harus diisi.'],
  },
  experienceOfChairman: {
    type: [String],
  },
  experienceOfViceChairman: {
    type: [String],
  },
  visionAndMission: {
    type: [String],
    required: [true, 'Visi dan misi harus diisi.'],
  },
  motto: {
    type: String,
    required: [true, 'Moto harus diisi.'],
  },
  photoOfChairman: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
  },
  photoOfViceChairman: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
  },
  totalSuara: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Candidate', candidate)
