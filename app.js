const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require("body-parser")

const PORT = process.env.PORT || config.get("port") || 5000

const app = express()

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.json({extended: true}));
//
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });
//
// app.use('/api/users', require('./routes/user.routes'))
// app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/products', require('./routes/product.routers'))
//
// app.use('/',express.static(path.join(__dirname, "client", "build")))
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"))
// })

const start = async () => {
    try {
        // await mongoose.connect(config.get('mongoURL'), {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // })
        app.listen(PORT, () =>g console.log(`app hes been started on port ${PORT} ...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

