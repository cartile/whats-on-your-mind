import { StringUtil } from '../../utilities/string-util'
import User from '../../model/user-model'

export async function index(req, res) {
    // login method basically
    const validation = validateIndex(req.body) 
    if(!validation.isValid) {
        return res.json({message: validation.message})
    }
    try {
        const user = await User.findOne({ username: req.body.username.toLowerCase() }).exec()
        if (!user) {
        return res.status(401).json()
        }

        const passwordsMatch = User.passwordMatches(req.body.password, user.password)
        if (!passwordsMatch) {
        return res.status(401).json()
        }

        return res.status(200).json()
    } catch (error) {
        console.log(error)
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

    return{
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}
