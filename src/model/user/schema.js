import mongoose from 'mongoose'

const collection = 'user'
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: String
}, {
  collection,
  timestamps: true,
  versionKey: false
})

export default mongoose.model(collection, schema)
