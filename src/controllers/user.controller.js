const User = require('../models/user.model');

const getAllUsers =  async (req, res) => {
    const users = await User.find({}).select('-password').lean().exec();
    return res.status(200).json({ data : users });
}

module.exports = {
    getAllUsers
}