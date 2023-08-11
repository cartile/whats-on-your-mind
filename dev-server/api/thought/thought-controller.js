import User from '../../model/user-model'
import Thought from '../../model/thought-model'
import * as auth from '../../services/auth-service'

export async function index(req, res) {
    // find all thoughts
    try {
        const thoughts = await Thought.aggregate([
            {
                $addFields: {
                    latestActivity: {
                        $max: ["$createdAt", "$updatedAt"]
                    }
                }
            },
            {
                $sort: {
                    latestActivity: -1
                }
            }
        ])
        .lookup({
            from: "users", 
            localField: "author",
            foreignField: "_id",
            as: "author"
        })
        .unwind("author"); // assuming each thought has only one author

        res.set('Cache-Control', 'public, max-age=300');
        return res.status(200).json({ thoughts: thoughts });
    } catch (error) {
        console.log(error);
        return res.status(500).json();
    }
}


export async function create(req, res) {
    // create thought
    try {
        const id = auth.getUserId(req)
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
        const userId = auth.getUserId(req)
        const user = await User.findOne({ _id: userId}).exec()
        if(!user) {
            return res.status(404).json()
        }
        const thought = req.body
        thought.author = user._id

        await Thought.findByIdAndUpdate({_id: thought._id}, thought).exec()
        return res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}

export async function remove(req, res) {
    console.log
    try {
        const id = auth.getUserId(req)
        const thought = await Thought.findOne({_id: req.params.id}).exec()
        if(!thought) {
            return res.status(404).json()
        }
        if(thought.author._id.toString() !== id) {
            return res.status(403).json({message: 'You can only delete your own thoughts.'})
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

export async function updateLikes(req, res) {
    // get thought via id
    try {
        const userId = auth.getUserId(req);
        const user = await User.findOne({ _id: userId }).exec();
        
        const { likes } = req.body
        const thoughtId = req.params.id
        const thought = await Thought.findOne({_id: req.params.id})
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if(!thought) {
            return res.status(404).json()
        }

        thought.likes = likes
        await thought.save()
        const isLiked = user.likedPosts.includes(thoughtId)
        if (!isLiked) {
            //thought ID is not in the likedPosts array, add it
            user.likedPosts.push(thoughtId)
        } else {
            // If the thought has no likes and the thought ID is in the likedPosts array, remove it
            // thought ID is in the likedPosts array, remove it
            const indexOfThought = user.likedPosts.indexOf(thoughtId);
            if (indexOfThought !== -1) {
                user.likedPosts.splice(indexOfThought, 1);
            }
        }
        await user.save(); // Save the user to update the likedPosts array

        return res.status(204).json()
    } catch (error) {
        console.error('Error updating likes:', error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
}