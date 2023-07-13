import { StringUtil } from '../../utilities/string-util'
import User from '../../model/user-model'

export function index(req, res) {
    // login method basically
    const validation = validateIndex(req.body) 
    if(!validation.isValid) {
        return res.json({message: validation.message})
    }
    User.findOne({username: req.body.username.toLowerCase()},
    (error, user) => {
        if(error) {
            return res.status(500).json()
        }
        if(!user){
            return res.status(401).json()
        }

        const passwordsMatch = User.passwordsMatch(req.body.password, user.password)
        if(!passwordsMatch) {
            return res.status(401).json();
        }
        return res.status(200).json()
    })

 

    
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
