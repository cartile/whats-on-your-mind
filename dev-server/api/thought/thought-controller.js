import User from '../../model/user-model'
import Thought from '../../model/thought-model'
import { trackSlotScopes } from '@vue/compiler-core'
import { looseEqual } from '@vue/shared'

export async function index(req, res) {
    //find all thoughts
    try {
        const thoughts = await Thought.find().populate('author', 'username', 'user')
        return res.status(200).json({ thoughts: thoughts })
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}

export async function create(req, res) {
    // create thought
    try {
        const id = 0;
        const user = await User.findOne({ _id: id}).exec()
        if(!user){
            return res.status(500).json()
        }
        const thought = new Thought(req.body.thought)
        thought.author = user._id

        await thought.save()
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json()
    }
}

export async function update(req, res) {
    try {
        const id = 0
        const user = await User.findOne({ _id: id}).exec()
        if(!user) {
            return res.status(404).json()
        }
        const thought = req.body.thought
        thought.author = user._id

        await Thought.findByIdAndUpdate({_id: thought._id}, thought).exec()
        return res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}

export async function remove(req, res) {
    try {
        const id = 5
        const thought = await Thought.findOne({_id: req.params.id}).exec()
        if(!thought) {
            return res.status(404).json()
        }
        if(thought.author._id.toString() !== id) {
            return res.status(403).json({message: 'You can only delete your own tasks.'})
        }
        await Thought.deleteOne({_id: req.params.id}).exec()
        return res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}

export async function show(req, res) {
    // get thought via id
    try {
        const thought = await Thought.findOne({_id: req.params.id})
        if(!thought) {
            return res.status(404).json()
        }
        return res.status(200).json({thought: thought})
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}