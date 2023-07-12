import { StringUtil } from '../../utilities/string-util'
import User from '../../model/user-model'

export async function index(req, res) {
    const validation = validateIndex(req.body) 
    if(!validation.isValid) {
        return res.json({message: validation.message})
    }

    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            first: req.body.first,
            last: req.body.last,
        })
        await user.save()
        return res.status(201).json()
    } catch (error) {
        if(error.code === 11000) {
            return res.status(403).json({message: 'Username is already taken.'})
        }
        return res.status(500).json()
    }
}


function validateIndex(body) {
    let errors = '';
    if(StringUtil.isEmpty(body.username)) {
        errors += 'Please enter a username. '
    } 
    if(StringUtil.isEmpty(body.password)) {
        errors += 'Please enter a password. '
    }
    if(StringUtil.isEmpty(body.first)) {
        errors += 'Please enter a first name. '
    }
    if(StringUtil.isEmpty(body.last)) {
        errors += 'Please enter a last name. '
    }

    return{
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}
