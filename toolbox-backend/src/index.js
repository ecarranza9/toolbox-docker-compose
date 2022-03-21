import express from 'express'
import router from './routes/index.js'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

app.use(cors())

app.use(router)

export default app
