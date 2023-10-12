require("express-async-errors")
const express = require("express")
const morgan = require("morgan")
const { controller } = require("./controller")
const path = require("path")

const app = express()

const pathStaticFiles = path.join(__dirname, "./static")

app.use(express.static(pathStaticFiles))

app.use(morgan("combined"))

app.get("/", (req, res) => {
  return res.sendFile(pathStaticFiles)
})

app.get("/ytdownload/:videoURL", controller)

app.use((err, req, res, next) => {
  console.error(err)

  return res.status(500).json({ message: "Internal server error" })
})

app.listen(3001, () => {
  console.log("server running")
})
