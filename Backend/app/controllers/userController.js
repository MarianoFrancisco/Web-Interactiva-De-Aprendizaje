const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const createNewUser = async (req, res) => {
    console.log(req.body)
    const { username, password, fullname, roles, email, birthdayDate } = req.body;
    if (!username || !password || !fullname || !roles || !email || !birthdayDate) return res.status(400).json({ 'message': 'Username, password and fullname are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            email,
            fullname,
            username,
            "password": hashedPwd,
            roles,
            birthdayDate
        });        

        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateUser = async (req, res) => {
    console.log(req.body);
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body._id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    if (req.body?.fullname) user.fullname = req.body.fullname;
    if (req.body?.roles) user.roles = req.body.roles;
    if (req.body?.password) user.password = req.body.password;
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.birthdayDate) user.birthdayDate = req.body.birthdayDate;
    const result = await user.save();
    console.log(result);
    res.json(result);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findByIdAndDelete(req.body.id)
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    res.json(user);
}

const getUser = async (req, res) => {
    try {
        const id = req.userId;
        const results = await User.find({ _id: id});
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).jason({ message: 'No se encontraron resultados de este usuario...' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}