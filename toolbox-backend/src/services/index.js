import https from 'https'

export const httpGET = function (options, isGetFile) {
  return new Promise((resolve, reject) => {
    const get = https.get(options, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          const resBody = isGetFile ? data.toString() : JSON.parse(data)
          resolve(resBody)
        } catch (err) {
          reject(err)
        }
      })
    })
    get.on('error', reject)
    get.end()
  })
}
