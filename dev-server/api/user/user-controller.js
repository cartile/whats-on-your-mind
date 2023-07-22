import User from '../../model/user-model'

export async function index(req, res) {
    try {
      const users = await User.find({});
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }

export async function show(req, res) {
    try {
        const user = await User.findOne({_id: req.params.id})
        if(!user) {
            return res.status(404).json()
        }
        return res.status(200).json({user: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json()
    }
}