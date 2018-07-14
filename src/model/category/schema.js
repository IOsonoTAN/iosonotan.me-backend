import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const collection = 'blog'
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  highlightDetail: String,
  detail: String,
  category: {
    type: String,
    default: 'uncategorized'
  },
  tag: [String],
  featurePicture: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    enum: ['draft', 'saved', 'published', 'unpublished', 'deleted'],
    required: true,
    default: 'draft'
  },
  publishDate: {
    type: Date,
    required: true,
    default: new Date()
  }
}, {
  collection,
  timestamps: true,
  versionKey: false
})

schema.plugin(mongoosePaginate)

export default mongoose.model(collection, schema)
