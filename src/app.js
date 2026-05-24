const express = require("express")
const cors = require("cors")
const defs = require("./responses")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Importação de rotas

const noteRoutes = require("../routes/notes.routes")
const authRoutes = require("../routes/auth.routes")

app.use("/api", authRoutes)
app.use("/api", noteRoutes)

// middleware 404
app.use((req, res) => {
    res.status(404).json(defs.response("Error", "Route not found", 0, null))
})

module.exports = app