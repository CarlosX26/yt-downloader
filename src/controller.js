const { service } = require("./service")

const controller = (req, res) => {
  res.setHeader("Content-Type", "video/mp4")
  res.setHeader("Content-Disposition", "attachment; filename=video.mp4")

  const { videoURL } = req.params

  service(videoURL, res)
}

module.exports = {
  controller,
}
