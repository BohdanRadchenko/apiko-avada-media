const {Router} = require('express')
const path = require('path')
const fs = require('fs')
const multer = require("multer");
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const Product = require('../models/Product')
const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// /api/products/create
router.post('/create', auth, upload.single('photo'), async (req, res) => {
    try {
        const {title, location, description, price} = req.body
        const id = req.file.filename
        const userId = req.user.userId
        const product = new Product({title, location, description, photoId: id, price, user: userId})
        await product.save()
        res.status(201).json({message: `Product has been created`})
    } catch (e) {
        res.status(500).json({message: `error post create ${e.message}`})
    }
})

// /api/products/
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        // const filePath = path.join(__dirname, '../', 'uploads', products[0].photoId)
        // require("fs").readFile(filePath,  (err, img) => {
        //     res.setHeader('Content-Type', 'multipart/form-data')
        //     res.status(200).json({filePath})
        // });
        res.status(201).json({products, message: `Get all products`})
    } catch (e) {
        res.status(500).json({message: `error post list ${e.message}`})
    }
})

// /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const products = await Product.findById(id)
        res.status(201).json({products, message: `Get products by id`})
    } catch (e) {
        res.status(500).json({message: `error post list ${e.message}`})
    }
})

// /api/products/get/fav
router.get('/get/fav', auth, async (req, res) => {
    try {
        const products = await Product.find()
        const user = await User.findById(req.user.userId)

        const userFavorites = products.reduce((acc, prod) => {
            user.favorites.map(elId => {
                if (prod._id.toString() === elId.toString()) {
                    return acc.push(prod)
                }
                return acc
            })
            return acc
        }, [])

        res.status(200).json({userFavorites, message: `Get products fav `})
    } catch (e) {
        res.status(500).json({message: `error post list ${e.message}`})
    }
})

// /api/products/test
router.get('/get/test', async (req, res) => {
    const filePath = path.join(__dirname, '../', 'uploads', '1586551524263.png')
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "image/png");

    // fs.readFile(filePath, (err, image) => {
    //     res.end(image)
    // })

    // fs.readFile(filePath, (err, data) => {
    //     res.contentType('application/png')
    //         .send(`data:application/png;base64,${new Buffer.from(data.toString('base64')}`);
    // });

    // const filePath = path.join(__dirname, '../', 'uploads', '1586551524263.png')
    // res.download(filePath)
})


module.exports = router;