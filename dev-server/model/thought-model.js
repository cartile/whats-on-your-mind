import mongoose from 'mongoose'

const thoughtSchema = new mongoose.Schema({
    title: String,
    body: String,
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})
thoughtSchema.set('timestamps', true) //gives createdAt and updatedAt

export default mongoose.model('thought', thoughtSchema)