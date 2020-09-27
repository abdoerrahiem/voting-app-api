const firebase = require('firebase/app')
require('firebase/storage')
require('firebase/firestore')

const firebaseConfig = {
  apiKey: 'AIzaSyCi2ggMCVE1gaRE-JndXdJnWCLC7qpuCiU',
  authDomain: 'votingapp-169e3.firebaseapp.com',
  databaseURL: 'https://votingapp-169e3.firebaseio.com',
  projectId: 'votingapp-169e3',
  storageBucket: 'votingapp-169e3.appspot.com',
  messagingSenderId: '979686364979',
  appId: '1:979686364979:web:0621738871aaa4a1429046',
}

firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

module.exports = {
  projectStorage,
  projectFirestore,
  timestamp,
}
