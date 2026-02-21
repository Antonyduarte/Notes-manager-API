// require const's
require("dotenv").config()
const jwt = require("jsonwebtoken")
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const dataCfg = require("./src/cfg")
const defs = require("./src/responses")
const app = express()
const secret = require("./src/secret")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log("API is running")
    console.log(secret.key)
})
const API_VERSION = "1.0.0"
const API_AVAILABLE = true
app.use((req, res, next) => {
    if (API_AVAILABLE === true) {
        next()
    } else {
        return res.status(503).json(defs.response("Error", "Sorry, the API is in maintence", 0, null))
    }
})

//auth middleware
const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(403).json(defs.response("Error", "Unavailable token", 0, null))
    }
    const token = authHeader.split(" ")[1]
    
    jwt.verify(token, secret.key, (err, user) => {
        if (err) {
            return res.status(403).json(defs.response("Error", "Invalid token", 0, null))
        }
        req.user = user
        next()
    })
}

// const connection = mysql.createConnection(dataCfg)
const connection = mysql.createPool(dataCfg)
//register endpoint
app.post("/register", (req, res) => {
    const postData = req.body
    const username = postData.username
    const email = postData.email
    const password = postData.password

    connection.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
        if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
            return res.status(400).json(defs.response("Error", "Is there any empty field", 0, null)) //
        }
        if (err) {
            return res.status(500).json(defs.response("Error", "Username or email already exists.", 0, null))
        } else {
            return res.status(201).json(defs.response("Success", "Wellcome !, Please Log-in again", result.length))
        }
    })

})
//login endpoint
app.post("/login", (req, res) => {
    const postData = req.body
    const username = postData.username
    const password = postData.password

    connection.query("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
        if (err) {
            res.status(503).json(defs.response("Error", "Internal server error", 0, null))
        }
        if (rows.length === 0) {
            return res.status(401).json(defs.response("Error", "Invalid credentials", 0, null))
        }
        const user = rows[0]
        if (user.password !== password) {
            return res.status(401).json(defs.response("Error", "Invalid credentials", 0, null))
        }
        const token = jwt.sign({ id: user.id, role: user.role }, secret.key, { expiresIn: '1h' })
        res.json({ token: token })
    })
})

// get NOTES
app.get("/notes", (req, res) => {
    connection.query("SELECT * FROM notes WHERE user_id = ?", (err, result) => {
        if (err) {
            return res.status(503).json(defs.response("ERROR", "Notes NOT found", 0, null))
        } else {
            return res.status(200).json(result)
        }
    })
})
// Get note by ID
app.get("/note/:id", (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return res.status(400).json(defs.response("Error", "ID must be a number !", 0, null))
    }
    connection.query("SELECT * FROM notes WHERE id = ?", [id], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                return res.json(defs.response("Success", "Note found", rows.length, rows))
            } else {
                return res.status(404).json(defs.response("Error", "Task not found", 0, null))
            }
        } else {
            res.status(500).json(defs.response("Error", err.message, 0, null))
        }
    })
})
//search note by NOTE
app.get("/note/search/:note", (req, res) => {
    const note = String(req.params.note)
    if (!note || note.trim() === "") {
        return res.status(400).json(defs.response("Error", "Search term is required", 0, null))
    }
    connection.query("SELECT * FROM notes WHERE note LIKE ?", [`%${note}%`], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                return res.json(defs.response("Success", "Note(s) found", rows.affectedRows, rows))
            } else {
                return res.status(404).json(defs.response("Error", "Note not found", 0, null))
            }
        } else {
            res.status(500).json("Error", err.message, 0, null)
        }
    })
})
// create a note 
app.post("/note", (req, res) => {
    const postData = req.body
    const note = postData.note
    const title = postData.title
    //check if data is invalid
    if (!title || title.trim() === "") {
        return res.status(400).json(defs.response("Error", "Title can not be empty", 0, null))
    }
    if (!note || note.trim() === "") {
        return res.status(400).json(defs.response("Error", "Note must be a content", 0, null))
    }
    // query connection  
    connection.query("INSERT INTO notes (title, note, created_at, modified_at) VALUES (?, ?, NOW(), NOW())", [title, note], (err, result) => {
        if (!err) {
            return res.status(201).json(defs.response("Success", "Note created", result.affectedRows, null))
        } else {
            return res.status(500).json(defs.response("Error", err.message, 0, null))
        }
    })
})
// edit NOTE
app.put("/note/:id", (req, res) => {
    const postData = req.body
    const title = postData.title
    const note = postData.note
    const id = req.params.id
    if (!title || title.trim() === "") {
        return res.status(400).json(defs.response("Error", "Title can not be empty", 0, null))
    }
    if (!note || note.trim() === "") {
        return res.status(400).json(defs.response("Error", "Note must be a content", 0, null))
    }
    // query
    connection.query("UPDATE notes SET title = ?, note = ? WHERE id = ?", [title, note, id], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                res.json(defs.response("Success", "Note sussefully updated", result.affectedRows, result))
            } else {
                return res.status(404).json(defs.response("Error", "ID not found", 0, null))
            }
        } else {
            return res.status(500).json(defs.response("Internal error", err.message, 0, null))
        }
    })
})
// DELETE ALL NOTES
app.delete("/notes", (req, res) => {
    connection.query("DELETE FROM notes", (err, rows) => {
        if (!err) {
            if (rows.affectedRows <= 0) {
                res.status(400).json(defs.response("Error", "Do not exists notes here!", 0, null))
            } else {
                res.status(200).json(defs.response("Success", "All notes are deleted", rows.affectedRows,))
            }
        } else {
            res.status(500).json(defs.response("Internal Error", err.message, 0, null))
        }
    })
})
// delete specifc note
app.delete("/note/:id", (req, res) => {
    const id = req.params.id
    // query connection
    connection.query("DELETE FROM notes WHERE id = ?", [id], (err, rows) => {
        if (!err) {
            if (rows.affectedRows > 0) {
                res.status(200).json(defs.response(`Success`, `Task ${id} are deleted`, rows.affectedRows, null))
            } else {
                res.status(404).json(defs.response("Error", "Task not found", 0, null))
            }
        } else {
            res.status(500).json(defs.response("Error", err.message, 0, null))
        }
    })
})

app.use((req, res) => {
    res.status(404).json(defs.response("Error", "Route NOT found", 0, null))
})
