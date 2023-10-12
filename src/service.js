const ytdl = require("ytdl-core")
const fs = require("fs")
const path = require("path")

const service = (videoURL, res) => {
  let totalSize = 0

  const pathTemp = path.join(__dirname, "../temp/video.mp4")

  ytdl(`https://youtu.be/${videoURL}`)
    .on("data", (chunk) => {
      totalSize += chunk.length

      // console.log(`Recebi ${chunk.length} bytes de dados.`)
    })
    .on("end", () => {
      const sizeMB = totalSize / (1024 * 1024)

      console.log(
        `Leitura do arquivo concluída. Tamanho total: ${sizeMB.toFixed(2)} MB.`
      )
    })
    .pipe(
      fs.createWriteStream(pathTemp).on("finish", () => {
        console.log("Escrita no arquivo de destino concluída.")

        const fileStream = fs.createReadStream(pathTemp)

        fileStream.on("end", () => {
          fs.unlink(pathTemp, (unlinkErr) => {
            if (unlinkErr) {
              console.log(`Erro ao excluir o arquivo: ${unlinkErr}`)
            } else {
              console.log("Arquivo excluído com sucesso.")
            }
          })

          res.end()
        })

        fileStream.pipe(res)
      })
    )
}

module.exports = { service }
