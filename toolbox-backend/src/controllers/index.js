import { validateData } from '../helpers/index.js'
import { httpGET } from '../services/index.js'

const getFilesOptions = {
  hostname: 'echo-serv.tbxnet.com',
  port: 443,
  path: '/v1/secret/files',
  method: 'GET',
  headers: {
    authorization: 'Bearer aSuperSecretKey'
  }
}

const getFileDataOptions = (file) => ({
  hostname: 'echo-serv.tbxnet.com',
  port: 443,
  path: `/v1/secret/file/${file}`,
  method: 'GET',
  headers: {
    authorization: 'Bearer aSuperSecretKey'
  }
})

export const getFilesData = async (req, res) => {
  try {
    const { query } = req
    const response = await httpGET(getFilesOptions, false)
    if (!response) {
      return res.json('Error to get files list')
    }
    let files = response.files
    if (query.fileName) {
      const { fileName } = query
      files = files.filter(file => file === fileName.toString())
    }
    const responseFormattedFiles = []
    // loop on each file and validate data
    for (const file of files) {
      const response = await httpGET(getFileDataOptions(file), true)
      const formattedData = validateData(response)
      if (!formattedData.isInvalid) {
        responseFormattedFiles.push(formattedData)
      }
    }
    return res.status(200).json(responseFormattedFiles)
  } catch (error) {
    return res.status(404).json(error).end()
  }
}

export const getFilesList = async (req, res) => {
  try {
    const files = await httpGET(getFilesOptions, false)
    if (!files) {
      res.json('Error to get files list')
    }
    return res.status(200).json(files)
  } catch (error) {
    return res.status(404).json(error).end()
  }
}
