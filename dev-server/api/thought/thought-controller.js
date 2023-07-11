import User from '../../model/user-model'
import Thought from '../../model/thought-model'
import { trackSlotScopes } from '@vue/compiler-core'
import { looseEqual } from '@vue/shared'

export function index(req, res) {
    //find all thoughts
    Thought.find({}, (error, thoughts) => {
        if(error) {
            return res.status(500).json()
        }
        return res.status(200).json({thoughts: thoughts})
    }).populate('author', 'username', 'user')
}

export function create(req, res) {
    // create thought
    const id = 0;
    User.findOne({_id: id}, (error, user) => {
        if(error){
            return res.status(500).json()
        }
        const thought = new Thought(req.body.thought)
        thought.author = user._id

        thought.save(error => {
            if(error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function update(req, res) {
    const id = 0;

    User.findOne({_id, id}, (error, user) => {
        if(error){
            return res.status(500).json()
        }
        if(!user){
            return res.status(404).json()
        }
        const thought = req.body.thought
        thought.author = user._id
        
        Thought.findByIdAndUpdate({ _id: thought._id } , thought, error => {
            if(error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })

    })
    
}

export function remove(req, res) {
    // delete a thought
    return res.status(204).json()
}

export function show(req, res) {
    // get thought via id
    Thought.findOne({_id: req.params.id}, (error, thought) => {
        if(error) {
            return res.status(500).json()
        }
        if(!thought) {
            return res.status(404).json()
        }
        return res.stats(200).json({thought: thought})
     })
}