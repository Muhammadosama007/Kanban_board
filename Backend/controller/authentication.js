const {User}= require('../models/userModel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');




const login = async (req, res) => {
    const { password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(401).json({
            message: 'user not found!!!'
        })
    }
    else {
        const is_Match = await bcrypt.compare(password, user.password);
        if (!is_Match) {
            res.status(401).json({
                message: 'password not match!!'
            })
        }
        else {
            const encrytToken = jwt.sign({ id: user.id, email: user.email }, "secret");

            res.status(200).json({
                message: "successfully login",
                user: user,
                token: encrytToken
            });
        }
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: 'Email and Password Required!!'
        })
    }
    else {
        // const salt = 10;
        // const hashedPassword = await bcrypt.hash(password, salt);
        const pass = await bcrypt.hash(password,10);
        const newUser = new User({
            email: email,
            password: pass
        })

        await newUser.save();
        res.status(200).json({
            message: 'successfully registered and password encrypted._.',
            email: newUser.email,
            password: pass
        })
    }
}

module.exports={
    login,
    register
}
