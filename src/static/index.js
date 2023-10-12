class FormVideo {
  form = document.querySelector("form")
  input = document.querySelector("input")
  url = ""

  getFormData() {
    this.input.addEventListener("input", (e) => {
      this.url = e.target.value
    })
  }

  validateURL(url) {
    if (url.trim().startsWith("https://youtu.be/")) {
      if (url.split("/")[3].includes("?si=")) {
        this.url = url.trim().split("/")[3].split("?si=")[0]
      } else {
        this.url = url.trim().split("/")[3]
      }
      return
    }

    if (url.trim().startsWith("https://www.youtube.com/")) {
      this.url = url.trim().split("v=")[1]
      return
    }

    window.alert("URL inválida")
    this.url = ""
  }

  submit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.validateURL(this.url)

      if (this.url) {
        fetch(`/ytdownload/${this.url}`)
          .then((res) => {
            if (!res.ok) {
              return console.error("erro ao baixar arquivo")
            }

            return res.blob()
          })
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.style.display = "none"
            a.href = blobUrl
            a.download = "video.mp4"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(blobUrl)
          })
          .catch((err) => console.log(err))
      }
    })
  }
}

const formVideo = new FormVideo()
formVideo.getFormData()
formVideo.submit()
