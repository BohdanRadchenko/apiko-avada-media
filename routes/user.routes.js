const {Router} = require('express')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const Product = require('../models/Product')
const router = Router()

// /api/users/:id  get
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json({user, message: 'get user by id'})
    } catch (e) {
        res.status(500).json({message: `error get users by id ${e.message}`})
    }
})

// /api/users/products/:id  get
router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        const products = await Product.find({user : id})
        res.status(200).json({ profile : {user, products} , message: 'get user by id'})
    } catch (e) {
        res.status(500).json({message: `error get users by id ${e.message}`})
    }
})

// /api/users/fav/add patch
router.patch('/fav/add', auth, async (req, res) => {
    try {
        const productId = req.body.productId
        const userId = req.user.userId
        const user = await User.findById(userId)
        const fav = [...user.favorites, productId]
        await User.where({ _id: userId }).update({ favorites : fav })
        res.status(200).json({ message: 'patch fav '})
    } catch (e) {
        res.status(500).json({message: `error get users by id ${e.message}`})
    }
})

// /api/users/profile/edit patch
router.patch('/profile/edit', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        if(req.body.form.name) {
            await User.where({ _id: userId }).update({ name : req.body.form.name})
        }
        if(req.body.form.phone) {
            await User.where({ _id: userId }).update({phone : req.body.form.phone})
        }
        res.status(200).json({ message: 'User upgrade'})
    } catch (e) {
        res.status(500).json({message: `error get users by id ${e.message}`})
    }
})

module.exports = router;