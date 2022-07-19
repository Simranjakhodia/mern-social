const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

// Register
router.post("/register", async(req, res) => {
    
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(newUser);
        //save user and return response
        await newUser.save(err => {
            if(err) console.log(err);
        });
        console.log(newUser);
       // const user = await newUser.save();
        return res.status(200).json(newUser);
        } catch(err) {
            console.log("not working ")
            return res.status(500).json(err);
        }

});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email });
        !user && res.status(404).json("User not found")

        const validPassword  = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password")

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;