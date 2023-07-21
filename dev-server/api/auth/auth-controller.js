import { StringUtil } from '../../utilities/string-util'
import User from '../../model/user-model'
import  { generateJWT } from '../../services/auth-service'

export async function index(req, res) {
    // login method basically
    const validation = validateIndex(req.body) 
    if(!validation.isValid) {
        return res.json({message: validation.message})
    }
    try {
        const user = await User.findOne({ username: req.body.username.toLowerCase() }).exec()
        if (!user) {
            console.log("user doesnt exist")
            return res.status(401).json()
        }
        const passwordsMatch = User.passwordMatches(req.body.password, user.password)
        if (!passwordsMatch) {
            console.log("passwords dont match")
            return res.status(401).json()
        }
        const token = generateJWT(user)
        return res.status(200).json({token: token})
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
