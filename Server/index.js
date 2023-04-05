const path = require('path')
const express = require("express")
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require('./src/routes')

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()
const port = process.env.PORT || 3000

// Page Home
app.get("/", (req, res) => {
    res.send('SERVER ON')
})

// ZingMp3Router
const ZingMp3Router = require("./src/routes/ZingRouter")
app.use("/api", cors({ origin: '*' }), ZingMp3Router)

initRoutes(app)

// Page Error
app.get("*", (req, res) => {
    res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<")
});

app.listen(port, () => {
    console.log(`Start server listen at http://localhost:${port}`)
});
