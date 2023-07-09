import { StringUtil } from '../../utilities/string-util'

export function index(req, res) {
    const validation = validateIndex(req.body) 
    if(!validation.isValid) {
        return res.json({message: validation.message})
    }
    return res.json()
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
