const {Router} = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Min length password 6 ').isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect email address or password in register'
                })
            }
            const {email, name, password, passwordAgain} = req.body
            const phone = ''
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: `User - ${email} - already exists`})
            }
            if (password !== passwordAgain) {
                return res.status(400).json({message: "Incorrect password"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword, name, phone})
            await user.save()

            const newUser = User.findOne(email)
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.status(201).json({token, userId: user.id, message: `User - ${email} - has been created`})
        } catch (e) {
            res.status(500).json({message: `error post register ${e.message}`})
        }
    })

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Empty password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect email address or password in Log In'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password please try again'})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
        } catch (e) {
            res.status(500).json({message: `error post login ${e.message}`})
        }
    })

module.exports = router;